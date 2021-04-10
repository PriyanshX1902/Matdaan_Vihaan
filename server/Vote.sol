pragma solidity ^0.8.3;

contract Ballot{
    mapping(bytes32=>uint256) public Votes;

    bytes32[] public candidatelist;
    constructor(bytes32[] memory candidateNames){
    candidatelist = candidateNames;
    }
    function validCandidate(bytes32 candidate) view public returns (bool){
        for(uint i = 0;i < candidatelist.length;i++){
            if(candidatelist[i]==candidate){
                return true;
            }
        }
        return false;
    }

    function totalVotesOf(bytes32 candidate) view public returns (uint256){
        require(validCandidate(candidate));
        return Votes[candidate];
    }
    function voteIncrement(bytes32 candidate) public {
        require(validCandidate(candidate));
        Votes[candidate] += 1;
    }

}