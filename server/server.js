import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import db from './firebasedatabase.js';
import cors from 'cors';
import Web3 from 'web3';
import fs from 'fs';

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.port || 5000;
app.get('/', (req, res)=>{
    res.send('Hello!');
});
app.post('/createuser', function(req, res){
    const newUser = {
        Name: req.body.displayname,
        Email: req.body.email,
        Username: req.body.username,
        Password: req.body.password,
        PhoneNo: req.body.phoneNo,
        userid: req.body.userid
    };
    db.ref('users/' + newUser.userid).set({
        username: newUser.Username,
        name: newUser.Name,
        email: newUser.Email,
        phoneNumber: newUser.PhoneNo,
        password: newUser.Password,
        userid:newUser.userid
    });
    console.log(newUser);

});

app.get('/userprofile/:userid', function(req, res){
    const userid = req.params.userid;
    db.ref('/users/'+ userid).on('value', snap=>{
        const user = snap.val();
        res.send(JSON.stringify(user));
   });
    
});
app.post('/createelection', function(req, res){
    const election = {
        title: req.body.title,
        organisation: req.body.organisation,
        description: req.body.description,
        date: req.body.date,
        code: req.body.code,
        creatorid: req.body.creatorid
    }
    db.ref('/elections/'+ election.code).set({
        title: election.title,
        organisation: election.organisation,
        description: election.description,
        date: election.date,
        code: election.code,
        creatorid: election.creatorid

    });

    db.ref('/users/'+ election.creatorid + '/electionscreated/' + election.code).set({
        title: election.title,
        organisation: election.organisation,
        description: election.description,
        date: election.date,
        code: election.code
    })

});
app.post('/voterregistration', function(req, res){
    db.ref('/elections/'+ req.body.code + '/voters/'+ req.body.voterid).set({
        voterid: req.body.voterid
    });
    db.ref('/users/'+ req.body.voterid + '/asvoter/'+ req.body.code).set({
        electionCode: req.body.code
    });
})
app.post('/candidateregistration', function(req, res){
    db.ref('/elections/'+ req.body.code + '/candidates/'+ req.body.candidateid).set({
        candidateid: req.body.candidateid,
        party: req.body.party
    });
    db.ref('/users/'+ req.body.candidateid + '/ascandidate/'+ req.body.code).set({
        party: req.body.party,
        electionCode: req.body.code
    });
})

app.get('/getcandidatelist/:electionid', function(req, res){
    let candidatelist = [];
    const electionId = req.params.electionid;
    console.log(electionId);
    var count = 1;
    db.ref('/elections/'+ electionId + '/candidates/').once('value', snap=>{
        snap.forEach(childSnap=>{
            candidatelist.push({
                id: count++,
                candidateid: childSnap.val().candidateid,
                party: childSnap.val().party
            });
        })
    }).then(()=>{
        res.send(JSON.stringify(candidatelist));
        console.log(candidatelist);
    })
    
});

app.get('/yourelections/:userid', function(req, res){
    const userid = req.params.userid;
    let electionlist = [];
    var count = 1;
    db.ref('/users/'+userid+'/electionscreated/').once('value', snap=>{
        snap.forEach(childSnap=>{
            electionlist.push({
                id: count++,
                electionid: childSnap.val().code,
                date: childSnap.val().date,
                title: childSnap.val().title
            });
        })
    }).then(()=>{
        res.send(JSON.stringify(electionlist));
        console.log(electionlist);
    })
})
app.get('/asvoters/:userid', function(req, res){
    const userid = req.params.userid;
    let electionlist = [];
    var count = 1;
    db.ref('/users/'+userid+'/asvoter/').once('value', snap=>{
        snap.forEach(childSnap=>{
            electionlist.push({
                id: count++,
                electionid: childSnap.val().electionCode,
            });
        })
    }).then(()=>{
        res.send(JSON.stringify(electionlist));
        console.log(electionlist);
    })
})
app.get('/ascandidates/:userid', function(req, res){
    const userid = req.params.userid;
    let electionlist = [];
    var count = 1;
    db.ref('/users/'+userid+'/ascandidate/').once('value', snap=>{
        snap.forEach(childSnap=>{
            electionlist.push({
                id: count++,
                electionid: childSnap.val().electionCode,
                party: childSnap.val().party
            });
        })
    }).then(()=>{
        res.send(JSON.stringify(electionlist));
        console.log(electionlist);
    })
})

app.get('/elections', async function(req, res){
    const candidateid = req.query.candidateid;
    const electionid = req.query.electionid;
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545/"));
    /*const source = fs.readFileSync('Vote.sol', 'utf8');
    let jsonContractSource = JSON.stringify({
        language: 'Solidity',
        sources: {
          'Task': {
              content: source,
           },
        },
        settings: { 
            outputSelection: {
                '*': {
                    '*': ['abi',"evm.bytecode"],   
                 // here point out the output of the compiled result
                },
            },
        },
    });
    const compileCode = solc.compile(jsonContractSource);*/
    
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const fromAddress = accounts[2];
    console.log(accounts);
    const abidefinition = [{"inputs":[{"internalType":"bytes32[]","name":"candidateNames","type":"bytes32[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"Votes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidatelist","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"totalVotesOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"voteIncrement","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const byteCode = fs.readFileSync('Vote_sol_Ballot.bin').toString();
  
    var VotingContract = await new web3.eth.Contract(abidefinition)
    console.log(abidefinition);
    var candidatePartyName;
    let candidatebiglist = [];
    await db.ref('/elections/'+ electionid + '/candidates/').once('value', snap=>{
        snap.forEach(childSnap=>{
            var partyName = childSnap.val().party;
            candidatebiglist.push(partyName);
            if(childSnap.val().candidateid===candidateid){
                candidatePartyName = partyName;
            }
        })
    }).then(()=>{
        console.log(candidatebiglist);
        console.log(candidatePartyName);
    })
    await VotingContract.deploy({
            data: byteCode,
            arguments: [candidatebiglist.map(name=>web3.utils.asciiToHex(name))]
        }).send({
            from: address,
            gas:1000000,
            gasPrice: '20000000000'
        }).then((newContractInstance)=>{
            VotingContract.options.address = newContractInstance.options.address;
            console.log(newContractInstance.options.address);
        });
     
})



app.listen(port, console.log('Listening to port 5000'));


