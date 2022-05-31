#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    to_binary, Addr, BankMsg, Binary, Coin, Decimal, Deps, DepsMut, Env, MessageInfo, Order,
    Response, StdError, StdResult, Uint128
};





use crate::helpers::{is_lower_hex, make_drand, make_hash};
use crate::msg::{ConfigureResponse, ExecuteMsg, InstantiateMsg, QueryMsg };
use crate::state::{
    amount_update, lottery_winner_update, read_state, store_state, ticket_update, JackpotBalance,
    JackpotNum, State, Winner, COUNT_TICKET, COUNT_USER, JACKPOT, LOTTERY_BALANCE,
    LOTTERY_JACKPOT_COUNT, LOTTERY_WINNER, ROUND_JACKPOT_BALANCE, STATE, TICKET_ADDRESS,
    TICKET_COMBINATION, Drand, SEED_LIST,
};

use std::ops::{Add, Mul, Sub};



#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let state = State {
        admin: deps.api.addr_canonicalize(&info.sender.as_str())?, //관리자
        denom_stable: msg.denom_stable, //코인 종류
        combination_len: 6, //복권 조합 길이
        jackpot_seed_reward:Uint128::from(10000u128), //난수생성 기여에 대한 보상
        jackpot_seed_limit:5,
        prize_rank_winner_percentage: vec![80, 10, 6, 3, 1], //승자 보상 비율
        price_per_ticket_to_register: Uint128::from(10000u128), //티켓1개당 가격
        safe_lock: false, 
        jackpot_seed_lock:true,
        lottery_id: 1, //회차번호
        // terrand_contract_address: deps.api.addr_canonicalize(&msg.terrand_contract_address)?, //난수 컨트랙트 주소
    };
    
    STATE.save(deps.storage, &state)?;

    Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    match msg {
        ExecuteMsg::Register {
            address,
            combination,
        } => execute_register(deps, info, address, combination), //복권 구매
        ExecuteMsg::Claim {
            address,
            lottery_id,
        } => execute_claim(deps, _env, info, address, lottery_id), //당첨금 지급
        ExecuteMsg::Draw{} => execute_draw(deps, _env, info), //복권 추첨(관리자만 실행가능)
        ExecuteMsg::CollectCounter{} => execute_collect_count(deps,info), //복권 당첨자 수 확인
        ExecuteMsg::CollectBalance{} => execute_collect_balance(deps,info), //복권 당첨 랭킹 별 금액 조정
        ExecuteMsg::SafeLock{} => execute_safe_lock(deps, info),  //추첨시 락걸어놔야함.(관리자만 실행가능)
        ExecuteMsg::SeedGeneration {seed} =>execute_seed_generation(deps,info,seed),
        // 난중에 7일지난 lottery_balance 을 회수할 수 있게 해주면 좋을듯?
    }
}

//ROUND_JACKPOT_BALANCE 업데이트
pub fn execute_collect_balance(
    deps:DepsMut,
    info:MessageInfo
) ->StdResult<Response>{
    
      let mut state = read_state(deps.storage)?;
      let sender = deps.api.addr_canonicalize(info.sender.as_str())?;

      if sender != state.admin {
        return Err(StdError::generic_err("No Auth"));
      }
      if !state.safe_lock {
        return Err(StdError::generic_err("Deactivated"));
      }
        // 이번 회차 총 모인 금액
      let lottery_id_amount:Uint128 = LOTTERY_BALANCE.load(deps.storage, &state.lottery_id.to_be_bytes())?;

  
      let lottery_winner_count:Vec<Uint128> = LOTTERY_JACKPOT_COUNT.load(deps.storage, &state.lottery_id.to_be_bytes())?;
      let mut jackpot_balance = JackpotBalance{
          first :Uint128::new(0),
          second :Uint128::new(0),
          third :Uint128::new(0),
          fourth :Uint128::new(0),
          fifth :Uint128::new(0),
      };
      for i in 0..lottery_winner_count.len(){
        let index = i;
        if lottery_winner_count[index] == Uint128::new(0){
            continue
        }else{
            match index{
                0 => jackpot_balance.first = lottery_id_amount.mul(Decimal::percent(state.prize_rank_winner_percentage[0] as u64)) / lottery_winner_count[0],
                1 => jackpot_balance.second = lottery_id_amount.mul(Decimal::percent(state.prize_rank_winner_percentage[1] as u64)) / lottery_winner_count[1],
                2 => jackpot_balance.third = lottery_id_amount.mul(Decimal::percent(state.prize_rank_winner_percentage[2] as u64)) / lottery_winner_count[2],
                3 => jackpot_balance.fourth = lottery_id_amount.mul(Decimal::percent(state.prize_rank_winner_percentage[3] as u64)) / lottery_winner_count[3],
                4 =>jackpot_balance.fifth = lottery_id_amount.mul(Decimal::percent(state.prize_rank_winner_percentage[4] as u64)) / lottery_winner_count[4],
                _ => ()
            }
        }
      }

      
   
      ROUND_JACKPOT_BALANCE.save(deps.storage,&state.lottery_id.to_be_bytes(),&jackpot_balance)?;
      
      state.lottery_id += 1 as u64;
      state.safe_lock = false;
      store_state(deps.storage, &state)?;
      let res =  Response::new()
      .add_attribute("action","collect_balance")
      .add_attribute("round_jackpot_balance", format!("{:?}",jackpot_balance));
      
      Ok(res)
}



// LOTTERY_JACKPOT_COUNT 업데이트
pub fn execute_collect_count(
    deps:DepsMut,
    
    info:MessageInfo
)->StdResult<Response>{

    let state = read_state(deps.storage)?;
    let sender = deps.api.addr_canonicalize(info.sender.as_str())?;
    if sender != state.admin {
        return Err(StdError::generic_err("No Auth"));
    }
    if !state.safe_lock {
        return Err(StdError::generic_err("Deactivated"));
    }

    // 이번회차 구매한 목록
    let all = TICKET_COMBINATION
        .prefix(&state.lottery_id.to_be_bytes())
        .range(deps.storage, None, None, Order::Ascending)
        .collect::<StdResult<Vec<_>>>()
        .unwrap();
    //all = [combination,vec[address]];
    let jackpot = JACKPOT.load(deps.storage, &state.lottery_id.to_be_bytes())?;
    let winning_combination = jackpot.round;
   
    //몇등인지 파악하는 로직
    for (combination, addr) in all.into_iter() {
        let comb = combination.clone();
        let comb_str = comb.as_str();
        let winner_combination = winning_combination.clone();
        let mut combination_match = 0;
        for i in 0..comb_str.len() {
            // 123456, 123456
            if winner_combination.as_bytes()[i] == comb_str.as_bytes()[i] {
                combination_match += 1;
              
            } else {
                break;
            }
        }
        match combination_match {
            2 => {
                for address in addr {
                    lottery_winner_update(
                        deps.storage,
                        state.lottery_id,
                        combination.to_string(),
                        address,
                        5,
                    )?;
                }
            }
            3 => {
                for address in addr {
                    lottery_winner_update(
                        deps.storage,
                        state.lottery_id,
                        combination.to_string(),
                        address,
                        4,
                    )?;
                }
            }
            4 => {
                for address in addr {
                    lottery_winner_update(
                        deps.storage,
                        state.lottery_id,
                        combination.to_string(),
                        address,
                        3,
                    )?;
                }
            }
            5 => {
                for address in addr {
                    lottery_winner_update(
                        deps.storage,
                        state.lottery_id,
                        combination.to_string(),
                        address,
                        2,
                    )?;
                }
            }
            6 => {
                for address in addr {
                    lottery_winner_update(
                        deps.storage,
                        state.lottery_id,
                        combination.to_string(),
                        address,
                        1,
                    )?;
                }
            }
            _ => ()
        }
    }

    //랭킹 별 인원수 (인덱스별로 넣어야겠다.)
    let mut lottery_winner_count:Vec<Uint128> = vec![Uint128::new(0),Uint128::new(0),Uint128::new(0),Uint128::new(0),Uint128::new(0)];

   
    let winner_checked = LOTTERY_WINNER.load(deps.storage, &state.lottery_id.to_be_bytes());
    match winner_checked{
        Ok(winner_list) => {
            for winner in winner_list.into_iter() {  
                match winner.rank{
                    1|2|3|4|5 => lottery_winner_count[winner.rank as usize -1] += Uint128::new(1),
                  //   2 => lottery_winner_count[1] += Uint128::new(1),
                  //   3 => lottery_winner_count[2] += Uint128::new(1),
                  //   4 => lottery_winner_count[3] += Uint128::new(1),
                  //   5 => lottery_winner_count[4] += Uint128::new(1)
                  _ => ()
                }
              }
        },
        Err(_err) =>{
            let mut state = state.clone();
            let balance = LOTTERY_BALANCE.load(deps.storage,&state.lottery_id.to_be_bytes())?;
            let lottery_id = state.lottery_id +1;
            LOTTERY_BALANCE.save(deps.storage,&lottery_id.to_be_bytes() , &balance)?;
            state.safe_lock = false;
            state.lottery_id += 1;
            store_state(deps.storage, &state)?;
        }
    }

    
    

    //Vec<Winner>를 돌면서 rank 별로 lottery_winner_count 셋팅
 
    

    LOTTERY_JACKPOT_COUNT.save(
        deps.storage,
        &state.lottery_id.to_be_bytes(),
        &lottery_winner_count,
    )?;
    

  
    let res:Response = Response::new()
    .add_attribute("action", "collect")
    .add_attribute("rank_winner_count",format!("{:?}",lottery_winner_count));
    
    Ok(res)

}

//시드 생성 기여
pub fn execute_seed_generation(
    deps:DepsMut,
    info:MessageInfo,
    seed:String
)->StdResult<Response>{
    

    let state:State = read_state(deps.storage)?;

    //jackpot_seed_lock 이 걸려있으면 시드 생성 불가
    if state.jackpot_seed_lock{
        return Err(StdError::generic_err("Finished seed Generation"));
    }
    
    //회차당 drand 한 값들
    let drand_list:Vec<Drand> = SEED_LIST.load(deps.storage, &state.lottery_id.to_be_bytes())?;

    
    if state.jackpot_seed_limit > drand_list.len() as u64 {
       
        let addr = info.sender.to_string();
        SEED_LIST.update(deps.storage,&state.lottery_id.to_be_bytes(),|exsits|->StdResult<Vec<Drand>>{
            match exsits{
                Some(mut list) => {
                    let drand = make_drand(addr,seed);
                    list.push(drand);
                    Ok(list)
                }
                None =>{
                    let mut list:Vec<Drand> = vec![];
                    let drand = make_drand(addr,seed);
                    list.push(drand);
                    Ok(list)
                }
            }
        })?;
    }else if drand_list.len() as u64 == state.jackpot_seed_limit{
        let addr = info.sender.to_string();
        SEED_LIST.update(deps.storage,&state.lottery_id.to_be_bytes(),|exsits|->StdResult<Vec<Drand>>{
            match exsits{
                Some(mut list) => {
                    let drand = make_drand(addr,seed);
                    list.push(drand);
                    Ok(list)
                }
                None =>{
                    let mut list:Vec<Drand> = vec![];
                    let drand = make_drand(addr,seed);
                    list.push(drand);
                    Ok(list)
                }
            }
        })?;
        let mut state = state.clone();
        state.jackpot_seed_lock = true;
        store_state(deps.storage, &state)?;
    } 

    let mut balance = LOTTERY_BALANCE.load(deps.storage, &state.lottery_id.to_be_bytes())?;
    balance = balance.sub(state.jackpot_seed_reward);
    LOTTERY_BALANCE.save(deps.storage, &state.lottery_id.to_be_bytes(), &balance)?;


    let msg = BankMsg::Send {
        to_address: info.sender.to_string(),
        amount: vec![Coin {
            denom: state.denom_stable,
            amount: state.jackpot_seed_reward,
        }],
    };
  
    //과연 잘갈까??
    let res = Response::new()
        .add_message(msg)
        .add_attribute("action", "seed_generate_plus");

    Ok(res)
}

//복권 추첨
pub fn execute_draw(deps: DepsMut, _env: Env, info: MessageInfo) -> StdResult<Response> {
    let state = read_state(deps.storage)?;
    let sender = deps.api.addr_canonicalize(info.sender.as_str())?;
   
    
        
    if !state.safe_lock {
        return Err(StdError::generic_err("Deactivated"));
    }    
    // 관리자가 아니면 실행 x
    if sender != state.admin {
        return Err(StdError::generic_err("No Auth"));
    }
   

    //Logic when using Oracle
    // let msg:GetRandomness = msg::GetRandomness{
    //     round: state.combination_len as u64
    // };
    // let terrand_human = deps.api.addr_humanize(&state.terrand_contract_address)?;
    // let wasm = WasmQuery::Smart {
    //     contract_addr: terrand_human.to_string(),
    //     msg: to_binary(&msg)?,
    // };
    // //오라클에서 데이터 읽어오기
    // let res:GetRandomResponse = deps.querier.query(&wasm.into())?;
    // let randomness_hash = hex::encode(res.randomness.as_slice());
    // let n = randomness_hash
    //     .char_indices()
    //     .rev()
    //     .nth(state.combination_len as usize - 1)
    //     .map(|(i, _)| i)
    //     .unwrap();
    // // 이번회차 당첨번호
    // let winning_combination = &randomness_hash[n..];

    //   로또 번호 추첨  (rust rand 패키지 사용)
    // let mut prng = thread_rng();
    
    // let mut winning_combination = "".to_string();


    // for _i in 0..state.combination_len{
    //     let lottery_num:u32 = prng.gen_range(0..9);
    //     let a = lottery_num.to_string();
    //     winning_combination.push_str(&a);
    // }        

    //   let mut rng = StdRng::from_entropy();
    //   let mut winning_combination = "".to_string();
    //   for _i in 0..=5{
//         let index = rng.gen_range(0..drand_list.len());
//         let drand_seed = drand_list[index as usize].seed;
//         let mut std_rng = StdRng::from_seed(drand_seed);
        
//         let combination = std_rng.gen_range(0..=9).to_string();
//         winning_combination = winning_combination.add(&combination);
//     }


  //회차당 Seedlist -> 만약 20명이라면 20개의 list들을 해싱해서 combination에 저장 -> 
  let seed_list:Vec<Drand> = SEED_LIST.load(deps.storage, &state.lottery_id.to_be_bytes())?;
  let mut combination:String = "".to_string();
  for item in seed_list{
    let hash:String = make_hash(&item).to_string();
    combination = combination.add(&hash);
  }
  let len = combination.len();
  let winning_combination:&str = &combination[len-6..len];
  

    let jackpot_num_save = JackpotNum {
        worker: sender.clone(),
        round: winning_combination.to_string(),
    };
    // JACKPOT 에 저장
    JACKPOT.save(
        deps.storage,
        &state.lottery_id.to_be_bytes(),
        &jackpot_num_save,
    )?;
    

    Ok(Response::new()
        .add_attribute("action", "draw")
        // .add_attribute("draw_human", terrand_human)
        .add_attribute("jackpot-number", winning_combination.to_string()))
}

// 당첨금 지급
pub fn execute_claim(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    address: Option<String>,
    lottery_id: u64,
) -> StdResult<Response> {
    let state = read_state(deps.storage)?;
 
    //주소를 보냈는지 확인 없으면 info.sender
    let addr = match address {
        None => info.sender.clone(),
        Some(addr) => Addr::unchecked(addr),
    };

    //accounts
    let addr_raw = deps.api.addr_canonicalize(&addr.as_str())?;

    //먼저 address 에 맞는 걸 찾아와야겠지?
    // 이번회차 Winner vector
    let winner_list = LOTTERY_WINNER.load(deps.storage, &lottery_id.to_be_bytes())?;
    let mut is_win = false;

    // 계정에 맞는 위너 백터
    let mut address_and_winner = vec![];

    // 주소에 맞는 Winner 업데이트
    for winner in winner_list {
        if winner.claim == true {
            continue;
        } else if winner.addr == addr_raw {
            is_win = true;
            address_and_winner.push(winner)
        }
    }

    //위너가 아니라면 에러리턴
    if is_win == false {
        return Err(StdError::generic_err("You are Not Winner"));
    }

    let mut total_prize = Uint128::new(0);
    let round_jackpot_balance:JackpotBalance = ROUND_JACKPOT_BALANCE.load(deps.storage, &lottery_id.to_be_bytes())?;
    for winner in address_and_winner {
        let rank = winner.rank;
        match rank {
           1 => {
                total_prize += round_jackpot_balance.first;
            }
            2 => {
                total_prize += round_jackpot_balance.second;
            }
            3 => {
                total_prize += round_jackpot_balance.third;
            }
            4 => {
                total_prize += round_jackpot_balance.fourth;
            }
            5 => {
                total_prize += round_jackpot_balance.fifth;
            }
            _ => ()
        }
    }
    // Winner of LOTTERY_WINNER is same info.sender claim change
    LOTTERY_WINNER.update(
        deps.storage,
        &lottery_id.to_be_bytes(),
        |exsits| -> StdResult<Vec<Winner>> {
            match exsits {
                None => return Err(StdError::generic_err("Not found")),
                Some(mut list) => {
                    list.iter_mut().for_each(|winner| {
                        if winner.addr == addr_raw {
                            winner.claim = true
                        }
                    });
                    Ok(list)
                }
            }
        },
    )?;

    //---------------------이제 당첨자인지는 확인됬으니 당첨금액을 주면 되겠넹
    let msg = BankMsg::Send {
        to_address: info.sender.to_string(),
        amount: vec![Coin {
            denom: state.denom_stable,
            amount: total_prize,
        }],
    };
  
    //과연 잘갈까??
    let res = Response::new()
        .add_message(msg)
        .add_attribute("action", "send")
        .add_attribute("from", &info.sender)
        .add_attribute("to", &env.contract.address)
        .add_attribute("balance", total_prize.to_string());
    Ok(res)
}

//복권 등록
pub fn execute_register(
    deps: DepsMut,
    info: MessageInfo,
    address: Option<String>,
    combination: Vec<String>,
) -> StdResult<Response> {
    let state = read_state(deps.storage)?;
    if state.safe_lock {
        return Err(StdError::generic_err("Deactivated"));
    };
    //주소가 잇는 지 확인하는 로직
    let addr = match address {
        None => info.sender.clone(),
        Some(addr) => Addr::unchecked(addr),
    };

    //번호가 범위에 맞는 지 확인하는 로직
    for combo in combination.clone() {
        if !is_lower_hex(&combo, state.combination_len) {
            return Err(StdError::generic_err(format!(
                "Not authorized use combination of [a-f] and [0-9] with length {}",
                state.combination_len
            )));
        };
    }

    //돈을 보냈는지 확인하는 로직
    let sent = match info.funds.len() {
        0 => Err(StdError::generic_err(format!(
            "you need to send {}{} per combination in order to register",
            &state.price_per_ticket_to_register, &state.denom_stable
        ))),
        1 => {
            //코인 종류가 맞는지 & 티켓당가격이 맞는지 확인
            if info.funds[0].denom == state.denom_stable
                &&info.funds[0].amount == (state.price_per_ticket_to_register * Uint128::from(combination.len() as u128))
            {
                Ok(info.funds[0].amount)
            } else {
                Err(StdError::generic_err(format!(
                    "you need to send {}{} per combination in order to register",
                    &state.price_per_ticket_to_register, &state.denom_stable
                )))
            }
        }
        _ => Err(StdError::generic_err(format!(
            "Only send {0} to register",
            &state.denom_stable
        ))),
    }?;

    if sent.is_zero() {
        return Err(StdError::generic_err(format!(
            "you need to send {}{} per combination in order to register",
            &state.price_per_ticket_to_register, &state.denom_stable
        )));
    };

    COUNT_USER.update(
        deps.storage,
        &state.lottery_id.to_be_bytes(),
        |exsits| -> StdResult<Uint128> {
            match exsits {
                None => {
                    let one = Uint128::from(1u64);
                    Ok(one)
                }
                Some(num) => {
                    let result = num.add(Uint128::from(1u64));
                    Ok(result)
                }
            }
        },
    )?;
    //TICKET_COMBINATION 업로드
    let addr_raw = deps.api.addr_canonicalize(&addr.as_str())?;
    for combo in combination.clone() {
        ticket_update(deps.storage, state.lottery_id, addr_raw.clone(), combo)?;
    }

    //LOTTERY_BALANCE 업로드
    amount_update(deps.storage, state.lottery_id, sent)?;

    Ok(Response::new()
        .add_attribute("action", "register")
        .add_attribute("price_per_ticket", state.price_per_ticket_to_register)
        .add_attribute("amount_ticket", combination.len().to_string())
        .add_attribute("buyer", info.sender))
}

// 락 거는 로직
pub fn execute_safe_lock(deps: DepsMut, info: MessageInfo) -> StdResult<Response> {
    // Load the state
    let mut state = read_state(deps.storage)?;
    let sender = deps.api.addr_canonicalize(info.sender.as_str())?;
    if state.admin != sender {
        return Err(StdError::generic_err("Unauthorized"));
    }

    state.safe_lock = true;
    state.jackpot_seed_lock = false;
    store_state(deps.storage, &state)?;
    let mut drand_list = vec![];
    let drand = Drand{
        addr:info.sender.to_string(),
        seed:"복권추첨을 시작합니다.".to_string()
    };
    drand_list.push(drand);
    SEED_LIST.save(deps.storage,&state.lottery_id.to_be_bytes(),&drand_list)?;
    Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)] //조건부 컴파일
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Config {} => to_binary(&query_config(deps)?),
        QueryMsg::Balance { lottery_id } => to_binary(&query_balance(deps, lottery_id)?),
        QueryMsg::Combination {
            lottery_id,
            address,
        } => to_binary(&query_combination(deps, lottery_id, address)?),
        QueryMsg::Winner { lottery_id } => to_binary(&query_winner(deps, lottery_id)?),
        QueryMsg::GetJackpot { lottery_id } => to_binary(&query_jackpot(deps, lottery_id)?),
        QueryMsg::CountTicket { lottery_id } => to_binary(&query_count_ticket(deps, lottery_id)?),
        QueryMsg::CountUser { lottery_id } => to_binary(&query_count_user(deps, lottery_id)?),
        QueryMsg::JackpotBalance { lottery_id } => {
            to_binary(&query_jackpot_blanace(deps, lottery_id)?)
        }
        QueryMsg::JackpotCount { lottery_id } => to_binary(&query_jackpot_count(deps, lottery_id)?),
    }
}

fn query_config(deps: Deps) -> StdResult<ConfigureResponse> {
    let state = read_state(deps.storage)?;
    Ok(state)
}

fn query_combination(deps: Deps, lottery_id: u64, address: String) -> StdResult<Vec<String>> {
    let addr_raw = deps.api.addr_canonicalize(&address.as_str())?;
    let combination = match TICKET_ADDRESS.may_load(
        deps.storage,
        (&lottery_id.to_be_bytes(), &addr_raw.as_slice()),
    )? {
        None => {
            return Err(StdError::generic_err("Not found"));
        }
        Some(list) => list,
    };

    Ok(combination)
}

fn query_balance(deps: Deps, lottery_id: u64) -> StdResult<Uint128> {
    let balance = match LOTTERY_BALANCE.may_load(deps.storage, &lottery_id.to_be_bytes())? {
        None => {
            return Err(StdError::generic_err("Not found"));
        }
        Some(balance) => balance,
    };
    Ok(balance)
}

fn query_winner(deps: Deps, lottery_id: u64) -> StdResult<Vec<Winner>> {
    let winner = match LOTTERY_WINNER.may_load(deps.storage, &lottery_id.to_be_bytes())? {
        None => {
            return Err(StdError::generic_err("Not found"));
        }
        Some(winners) => winners,
    };

    Ok(winner)
}

fn query_jackpot(deps: Deps, lottery_id: u64) -> StdResult<JackpotNum> {
    let jackpot_num = match JACKPOT.may_load(deps.storage, &lottery_id.to_be_bytes())? {
        None => {
            return Err(StdError::generic_err("Not found"));
        }
        Some(jackpot) => jackpot,
    };

    Ok(jackpot_num)
}

fn query_count_ticket(deps: Deps, lottery_id: u64) -> StdResult<Uint128> {
    let count = match COUNT_TICKET.may_load(deps.storage, &lottery_id.to_be_bytes())? {
        None => {
            return Err(StdError::generic_err("Not found"));
        }
        Some(count) => count,
    };
    Ok(count)
}

fn query_count_user(deps: Deps, lottery_id: u64) -> StdResult<Uint128> {
    let count = match COUNT_USER.may_load(deps.storage, &lottery_id.to_be_bytes())? {
        None => {
            return Err(StdError::generic_err("Not found"));
        }
        Some(count) => count,
    };
    Ok(count)
}

fn query_jackpot_blanace(deps: Deps, lottery_id: u64) -> StdResult<JackpotBalance> {
    let jackpot_balance =
        match ROUND_JACKPOT_BALANCE.may_load(deps.storage, &lottery_id.to_be_bytes())? {
            None => {
                return Err(StdError::generic_err("Not found"));
            }
            Some(jackpot) => jackpot,
        };
    Ok(jackpot_balance)
}

fn query_jackpot_count(deps: Deps, lottery_id: u64) -> StdResult<Vec<Uint128>> {
    let list = match LOTTERY_JACKPOT_COUNT.may_load(deps.storage, &lottery_id.to_be_bytes())? {
        None => {
            return Err(StdError::generic_err("Not found"));
        }
        Some(list) => list,
    };
    Ok(list)
}

