//숫자 범위 확인

use std::{collections::hash_map::DefaultHasher, hash::{Hash, Hasher}};

use crate::state::Drand;

pub fn is_lower_hex(combination: &str, len: u8) -> bool {
    if combination.len() != (len as usize) {
        return false;
    }
    if !combination
        .chars()
        .all(|c| ('a'..='f').contains(&c) || ('0'..='9').contains(&c))
    {
        return false;
    }
    true
}

pub fn make_drand(addr:String,seed:String) ->Drand{
  
    let drand = Drand{
        addr,
        seed
    };
    drand
}
//해시만드는 함수
pub fn make_hash<T: Hash>(t: &T) -> u64 {
    let mut s = DefaultHasher::new();
    t.hash(&mut s);
    s.finish()
}