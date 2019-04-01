express = require('express')
morgan = require('morgan')
playstore = require('./playstore')
cors = require('cors')
app = express()
app.use(morgan('common'))
app.use(cors())

app.get('/apps',(req,res)=>{
  const{genre="",sort}=req.query
  let genreArray= ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].map(genre=> genre.toLowerCase())
  
  if(genre){

    if(!genreArray.includes(genre)){
      res.status(400).send('Please Provide a valid genre')
    }

    let searchResult = playstore.filter(app=>{
      console.log(app.Genres.toLowerCase().includes(genre),genre)

      return app.Genres.toLowerCase().includes(genre)
      
    })
    console.log(searchResult)
  }
  res.send('dddddd')

})


app.listen(8000,()=>{
  console.log('Express is listening on port 8000')
})

