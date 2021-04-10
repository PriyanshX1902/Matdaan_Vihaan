import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import db from './firebasedatabase.js';
import cors from 'cors';


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

app.listen(port, console.log('Listening to port 5000'));


