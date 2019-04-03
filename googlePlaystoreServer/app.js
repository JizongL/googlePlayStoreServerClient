express = require('express')
morgan = require('morgan')
playstore = require('./playstore')
cors = require('cors')
app = express()
app.use(morgan('common'))
app.use(cors())

app.get('/apps',(req,res)=>{
  let {genre='',sort}=req.query
  let genreArray= ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].map(genre=> genre.toLowerCase())
  let sortArray = ['rating','app']


  if(!genreArray.includes(genre)){
    res.send('provide a valid genre')
    return 
  }


    if(!genre){
      res.send(playstore)
      return
    }

    let searchResult = playstore.filter(app=>{
      console.log(app.Genres.toLowerCase().includes(genre))
  
        return app.Genres.toLowerCase().includes(genre)
        
      })


      if(sort){

        if(!sortArray.includes(sort.toLowerCase())){
          res.status(400).send('Provide valid sort term')
          return 
        }
        sort=sort[0].toUpperCase()+sort.slice(1)
        searchResult.sort((a,b)=>{
          return a[sort]>b[sort]?1:a[sort]<b[sort]?-1:0
        })
      }


      
      let newResult = searchResult.map(element=>element)
      
    

  
  res.json(newResult)

    



})


app.listen(8000,()=>{
  console.log('Express is listening on port 8000')
})

