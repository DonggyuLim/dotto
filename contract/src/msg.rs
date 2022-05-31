
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::state::State;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub denom_stable: String,
    // pub oracle_contract_address: String, //오라클 컨트랙트
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    Register {
        address: Option<String>,
        combination: Vec<String>,
    }, //복권 등록
    Draw{},
    CollectCounter{},
    CollectBalance{},
    Claim {
        address: Option<String>,
        lottery_id: u64,
    },
    SafeLock{}, //락
    SeedGeneration{
        seed:String
    } 
    
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Config {},

    Balance { lottery_id: u64 },

    Combination { lottery_id: u64, address: String },

    Winner { lottery_id: u64 },

    GetJackpot { lottery_id: u64 },

    CountTicket { lottery_id: u64 },

    CountUser { lottery_id: u64 },

    JackpotBalance { lottery_id: u64 },

    JackpotCount { lottery_id: u64 },
}





pub type ConfigureResponse = State;
