use std::ops::Add;

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{CanonicalAddr, StdResult, Storage, Uint128};
use cw_storage_plus::{Item, Map};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub admin: CanonicalAddr,                  //관리자
    pub denom_stable: String,                  //코인 종류???
    pub combination_len: u8,                   //조합 길이(로또)
    // pub jackpot_percentage_reward: u8,         //잭팟 비율 보상
    pub price_per_ticket_to_register: Uint128, //등록할 티켓당 가격
    pub safe_lock: bool,
    pub lottery_id: u64, //로또 회차수
    pub prize_rank_winner_percentage: Vec<i32>,
    pub jackpot_seed_reward:Uint128,
    pub jackpot_seed_limit:u64,
    pub jackpot_seed_lock:bool
    // pub oracle_contract_address: CanonicalAddr, //oracle 컨트랙트주소
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Winner {
    pub addr: CanonicalAddr,
    pub rank: i32,
    pub ticket: String,
    pub claim: bool,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct JackpotNum {
    pub worker: CanonicalAddr,
    pub round: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct JackpotBalance {
    pub first: Uint128,
    pub second: Uint128,
    pub third: Uint128,
    pub fourth: Uint128,
    pub fifth: Uint128,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema,Hash)]
pub struct Drand{
    pub addr:String,
    pub seed:String
}

//state 스토리지 저장하는 함수
pub fn store_state(storage: &mut dyn Storage, state: &State) -> StdResult<()> {
    STATE.save(storage, state)
}

//State 스토리지 읽어오는 함수
pub fn read_state(storage: &dyn Storage) -> StdResult<State> {
    STATE.load(storage)
}

pub fn ticket_update(
    storage: &mut dyn Storage,
    lottery_id: u64,
    address: CanonicalAddr,
    combination: String,
) -> StdResult<Vec<String>> {
    TICKET_COMBINATION.update(
        storage,
        (&lottery_id.to_be_bytes(), combination.clone()),
        |exsits| -> StdResult<Vec<CanonicalAddr>> {
            match exsits {
                Some(mut vec) => {
                    vec.push(address.clone());
                    Ok(vec)
                }
                None => {
                    let mut vec: Vec<CanonicalAddr> = Vec::new();
                    vec.push(address.clone());
                    Ok(vec)
                }
            }
        },
    )?;

    COUNT_TICKET.update(
        storage,
        &lottery_id.to_be_bytes(),
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

    TICKET_ADDRESS.update(
        storage,
        (&lottery_id.to_be_bytes(), &address.as_slice()),
        |exsits| -> StdResult<Vec<String>> {
            match exsits {
                Some(mut vec) => {
                    vec.push(combination.clone());
                    Ok(vec)
                }
                None => {
                    let mut vec: Vec<String> = Vec::new();
                    vec.push(combination.clone());
                    Ok(vec)
                }
            }
        },
    )
}

pub fn amount_update(
    storage: &mut dyn Storage,
    lottery_id: u64,
    amount: Uint128,
) -> StdResult<Uint128> {
    LOTTERY_BALANCE.update(
        storage,
        &lottery_id.to_be_bytes(),
        |exist| -> StdResult<Uint128> {
            match exist {
                Some(total_amount) => Ok(total_amount + amount),
                None => Ok(amount),
            }
        },
    )
}

pub fn lottery_winner_update(
    storage: &mut dyn Storage,
    lottery_id: u64,
    combination: String,
    addr: CanonicalAddr,
    rank: i32,
) -> StdResult<Vec<Winner>> {
    LOTTERY_WINNER.update(
        storage,
        &lottery_id.to_be_bytes(),
        |exsits| -> StdResult<Vec<Winner>> {
            match exsits {
                None => {
                    let mut list = Vec::new();

                    let winner = Winner {
                        addr,
                        rank,
                        ticket: combination.clone(),
                        claim: false,
                    };
                    list.push(winner);
                    Ok(list)
                }
                Some(mut list) => {
                    let winner = Winner {
                        addr,
                        rank,
                        ticket: combination.clone(),
                        claim: false,
                    };
                    list.push(winner);

                    Ok(list)
                }
            }
        },
    )
}



// 컨트랙트 기본 설정
pub const STATE: Item<State> = Item::new("state");

pub const COUNT_USER: Map<&[u8], Uint128> = Map::new("count_user");
pub const COUNT_TICKET: Map<&[u8], Uint128> = Map::new("count_ticket");

pub const TICKET_COMBINATION: Map<(&[u8], String), Vec<CanonicalAddr>> = Map::new("ticket");
//티켓 = (회차번호,로또번호) -> Vec<주소>
//TICKET_COMBINATION: (lottery_id.to_be_bytes(),combinations) -> address

pub const TICKET_ADDRESS: Map<(&[u8], &[u8]), Vec<String>> = Map::new("ticekt_for_address");
//TICKET_ADDRESS : (lottery_id.to_be_bytes(),address.as_slice()) -> vec[combination]

pub const JACKPOT: Map<&[u8], JackpotNum> = Map::new("jackpot");
//JACKPOT :lottery_id ->JackpotNum:{worker:CanonicalAddr,round : String}

pub const LOTTERY_BALANCE: Map<&[u8], Uint128> = Map::new("lottery_Balance");
//LOTTERY_AMOUNT = lottery_id,amount

pub const LOTTERY_WINNER: Map<&[u8], Vec<Winner>> = Map::new("lottery_winner");
//LOTTERY_WINNER = lottery_id -> Winner{
// addr:CanonicalAddr,
//rank:i32
// ticket:String
//claim:bool
// }

pub const LOTTERY_JACKPOT_COUNT: Map<&[u8], Vec<Uint128>> = Map::new("lottery_jackpot_count");
//LOTTERY_JACKPOT_COUNT = //회차번호 -> vec[당첨자수,]

//등수별 받아야할 액수
pub const ROUND_JACKPOT_BALANCE: Map<&[u8], JackpotBalance> = Map::new("round_jackpot_balance");
//ROUND_JACKPOT_BALANCE = //회차번호 -> JackpotBalance
//JackpotBalance{
//      first:Uint128,
//      second:Uint128,
//      third:Uint128,
//      fourth:Uint128,
//      fifth:Uint128
//  }

pub const SEED_LIST:Map<&[u8],Vec<Drand>> = Map::new("seed_list");