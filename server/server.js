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
    db.ref('/elections/'+ req.body.code + '/results/'+ req.body.candidateid).set({
        candidateid: req.body.candidateid,
        party: req.body.party,
        votes: 0
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
/*app.get('/elections', async function(req, res){
    const candidateid = req.query.candidateid;
    const electionid = req.query.electionid;
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545/"));
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const fromAddress = accounts[2];
    console.log(accounts);
    const abidefinition = [
        {
            "inputs": [
                {
                    "internalType": "bytes32[]",
                    "name": "candidateNames",
                    "type": "bytes32[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "Votes",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidatelist",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "candidate",
                    "type": "bytes32"
                }
            ],
            "name": "totalVotesOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "candidate",
                    "type": "bytes32"
                }
            ],
            "name": "validCandidate",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "candidate",
                    "type": "bytes32"
                }
            ],
            "name": "voteIncrement",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    const byteCode = fs.readFileSync('Vote_sol_Ballot.bin').toString();
    var VotingContract = await new web3.eth.Contract(abidefinition)
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
        candidatebiglist.forEach((item, index)=>{
            console.log(web3.utils.asciiToHex(item));
        })
        VotingContract.deploy({
            data: '0x608060405234801561001057600080fd5b5060405161074d38038061074d83398181016040528101906100329190610164565b806001908051906020019061004892919061004f565b5050610288565b82805482825590600052602060002090810192821561008b579160200282015b8281111561008a57825182559160200191906001019061006f565b5b509050610098919061009c565b5090565b5b808211156100b557600081600090555060010161009d565b5090565b60006100cc6100c7846101ca565b6101a5565b905080838252602082019050828560208602820111156100eb57600080fd5b60005b8581101561011b5781610101888261014f565b8452602084019350602083019250506001810190506100ee565b5050509392505050565b600082601f83011261013657600080fd5b81516101468482602086016100b9565b91505092915050565b60008151905061015e81610271565b92915050565b60006020828403121561017657600080fd5b600082015167ffffffffffffffff81111561019057600080fd5b61019c84828501610125565b91505092915050565b60006101af6101c0565b90506101bb8282610200565b919050565b6000604051905090565b600067ffffffffffffffff8211156101e5576101e4610231565b5b602082029050602081019050919050565b6000819050919050565b61020982610260565b810181811067ffffffffffffffff8211171561022857610227610231565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b61027a816101f6565b811461028557600080fd5b50565b6104b6806102976000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80631f0553af1461005c57806337313f1714610078578063392e6678146100a8578063911eb81d146100d8578063dd9d3e4c14610108575b600080fd5b61007660048036038101906100719190610294565b610138565b005b610092600480360381019061008d9190610294565b610177565b60405161009f9190610349565b60405180910390f35b6100c260048036038101906100bd9190610294565b6101a5565b6040516100cf9190610313565b60405180910390f35b6100f260048036038101906100ed91906102bd565b61022e565b6040516100ff919061032e565b60405180910390f35b610122600480360381019061011d9190610294565b610252565b60405161012f9190610349565b60405180910390f35b610141816101a5565b61014a57600080fd5b6001600080838152602001908152602001600020600082825461016d9190610364565b9250508190555050565b6000610182826101a5565b61018b57600080fd5b600080838152602001908152602001600020549050919050565b600080600090505b6001805490508110156102235782600182815481106101f5577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002001541415610210576001915050610229565b808061021b906103da565b9150506101ad565b50600090505b919050565b6001818154811061023e57600080fd5b906000526020600020016000915090505481565b60006020528060005260406000206000915090505481565b60008135905061027981610452565b92915050565b60008135905061028e81610469565b92915050565b6000602082840312156102a657600080fd5b60006102b48482850161026a565b91505092915050565b6000602082840312156102cf57600080fd5b60006102dd8482850161027f565b91505092915050565b6102ef816103ba565b82525050565b6102fe816103c6565b82525050565b61030d816103d0565b82525050565b600060208201905061032860008301846102e6565b92915050565b600060208201905061034360008301846102f5565b92915050565b600060208201905061035e6000830184610304565b92915050565b600061036f826103d0565b915061037a836103d0565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156103af576103ae610423565b5b828201905092915050565b60008115159050919050565b6000819050919050565b6000819050919050565b60006103e5826103d0565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561041857610417610423565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b61045b816103c6565b811461046657600080fd5b50565b610472816103d0565b811461047d57600080fd5b5056fea26469706673582212203ab6764ebcc3f7be2cb0cb3b76fb2e049b38cf13cdc885dcbe5bd809874603f564736f6c63430008030033',
            arguments: [candidatebiglist.map(name=>web3.utils.asciiToHex(name))]
        }).send({
            from: address,
            gas:3000000,
            gasPrice: '20000000000'
        }).then((newContractInstance)=>{
            VotingContract.options.address = newContractInstance.options.address;
            console.log(newContractInstance.options.address);
            VotingContract.methods.voteIncrement(web3.utils.asciiToHex('BJP')).send({from: address}).then(res=>{
                VotingContract.methods.totalVotesOf(web3.utils.asciiToHex('BJP')).call().then((f)=>{
                    console.log(f);
                });
            });
            
        });
    })

        
     
});*/

app.get('/elections/', async function(req, res){
    const partyName = req.query.partyName;
    const electionid = req.query.electionid;
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545/"));
    const accounts = await web3.eth.getAccounts();
    const address = accounts[1];
    
    const abidefinition = [
        {
            "inputs": [
                {
                    "internalType": "bytes32[]",
                    "name": "candidateNames",
                    "type": "bytes32[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "Votes",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidatelist",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "candidate",
                    "type": "bytes32"
                }
            ],
            "name": "totalVotesOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "candidate",
                    "type": "bytes32"
                }
            ],
            "name": "validCandidate",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "candidate",
                    "type": "bytes32"
                }
            ],
            "name": "voteIncrement",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    const VotingContract = new web3.eth.Contract(abidefinition);

    VotingContract.options.address = '0xAd0759EFd86CEcFdd28898e03E20539eD9BAEA80';
    VotingContract.methods.voteIncrement(web3.utils.asciiToHex(partyName)).send({from: address}).then(f=>{
        VotingContract.methods.totalVotesOf(web3.utils.asciiToHex(partyName)).call().then((f)=>{
            console.log(f);
        });
    })

        
     
});

app.get('/getresult/:electionid', async function(req, res){
    
    const electionid = req.params.electionid;
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545/"));
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const fromAddress = accounts[2];
    console.log(accounts);
    const abidefinition = [
        {
            "inputs": [
                {
                    "internalType": "bytes32[]",
                    "name": "candidateNames",
                    "type": "bytes32[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "Votes",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidatelist",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "candidate",
                    "type": "bytes32"
                }
            ],
            "name": "totalVotesOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "candidate",
                    "type": "bytes32"
                }
            ],
            "name": "validCandidate",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "candidate",
                    "type": "bytes32"
                }
            ],
            "name": "voteIncrement",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    const byteCode = fs.readFileSync('Vote_sol_Ballot.bin').toString();
    var VotingContract = await new web3.eth.Contract(abidefinition);
    VotingContract.options.address = '0xAd0759EFd86CEcFdd28898e03E20539eD9BAEA80';
    let candidatebiglist = [];
    var count = 1;
    await db.ref('/elections/'+ electionid + '/candidates/').once('value', snap=>{
        snap.forEach(childSnap=>{
            var partyName = childSnap.val().party;
            
            candidatebiglist.push({
                id: count++,
                party: partyName,
                candidateid: childSnap.val().candidateid,
                votes: 0
            });
        })
    }).then(async ()=>{
        await Promise.all(candidatebiglist.map(async (item)=>{
            await VotingContract.methods.totalVotesOf(web3.utils.asciiToHex(item.party)).call().then((f)=>{
                item.votes += f;
                console.log(item);
            });
        }));
        res.send(candidatebiglist); 
        console.log(candidatebiglist);
        
    })
    
     
});



app.listen(port, console.log('Listening to port 5000'));


