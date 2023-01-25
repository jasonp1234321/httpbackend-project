const express = require('express');
const app = express();
// Enable a feature needed for POST request and add the following line of code
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Hello there');
});

const musics = [
    {id:1, genre:'pop', year:9, month:6, name:"summertime"},
    {id:2, genre: 'hiphop', year:2, month:4, name:"God Did"},
    {id:3, genre: 'rap', year:3, month:11, name:"godzilla"},
    {id:4, genre: 'clasical', year:3, month:2, name:"fur elise"},
    {id:5, genre: 'rock', year:8, month:6, name:"Bohemiuan Rhapsody"},
    {id:6, genre: 'jazz', year:12, month:1, name:"fly me to the moon"},
    {id:7, genre: 'blues', year:6, month:9, name:"a decade in blue"},
    {id:8, genre: 'electronic', year:5, month:4, name:"tip tap"},
];

// HTTP GET requests route
app.get('/api/musics', (req,res)=>{
    res.send("Welcome to the music app")
    for(i = 1;i < musics.length;i++)
    {
        if (i >= 1)
        {
            while(musics[i].year < musics[i-1].year)
            {
                const temp = musics[i];
                musics[i] = musics[i-1];
                musics[i-1] = temp;
                i--;
            }
            if((musics[i].year == musics[i-1].year))
            {
                while(musics[i].month < musics[i-1].month)
                {
                    const temp = musics[i];
                    musics[i] = musics[i-1];
                    musics[i-1] = temp;
                    i--;
                }
            }
        }
    }
    res.send(musics);
})
//=========== ROUTES FOR HTTP POST REQUESTS ==========
app.post('/api/musics', (req,res) => {
    let music = null;
    if(req.body.name.length >= 3) {
        music ={
            id: musics.length +1,
            name:req.body.name,
            genre:req.body.genre,
            year:req.body.year,
            month:req.body.month
        }
    }
    else {
        res.send("The song needs to be at least 3 letters long")
    }
    if(req.body.name.length <= 100) {
        music ={
            id: musics.length +1,
            name:req.body.name,
            genre:req.body.genre,
            year:req.body.year,
            month:req.body.month
        }
    }
    else {
        res.send("The song needs to be at most 100 letters long")
    }
    musics.push(music);
    res.send(music);
    res.status(200);
});
//=========== ROUTES FOR HTTP PUT REQUESTS ==========
app.put('/api/musics/:id', (req,res)=>{
    let music = null;
    if(req.body.name.length >= 3) {
        music ={
            id: musics.length +1,
            name:req.body.name,
            genre:req.body.genre,
            year:req.body.year,
            month:req.body.monthe
        }
    }
    else {
        res.send("The name of the song must be at least 3 characters long.")
    }
    musics.push(music);
    res.status(200);
    let x = false;
    for (let i = 0;i < musics.length;i++)
    {
        if (music == musics[i])
        {
            x = true;
        }
    }
    if (x == false)
    {
        res.status(404).send("The song with the given ID was not found.");
        return
    }
    else
    {
        res.send(music);
        return
    }
    });
//=========== ROUTES FOR HTTP DELETE REQUESTS ==========
app.delete('/api/musics', (req,res)=>{
    if(req.body.id < musics.length && req.body.id >= 0)
    {
        for(i = 0;i < musics.length;i++)
        {
            if(req.body.id == musics[i].id)
            {
                fruits.splice(i, i+1);
            }
        }
        for(i = 0;i < musics.length;i++)
        {
            if(req.body.id < musics[i].id)
            {
                musics[i].id--;
            }
        }
        res.status(200);
        return;
    }
    else{
        res.status(404).send("The song with the given ID was not found.");
        return;
    }
})