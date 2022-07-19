const { Router } = require('express');
const {Activities,Country}=require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios=require('axios')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo=async()=>{
    const api= await axios('https://restcountries.com/v3/all')
    const infoApi= await api.data.map(e=>{
        return {
            id:e.cca3.toLowerCase(),
            name:e.name.common,
            img:e.flags[0],
            continent:e.continents[0],
            capital:e.capital? e.capital[0]:"No tiene capital",
            subregion:e.subregion? e.subregion: e.continents[0],
            area:e.area,
            population:e.population
        }
    })
    return infoApi
}
const activiDb=async()=>{
    const activi=Activities.findAll()
    return activi
}
const counDb=async()=>{
    try {
        info=await getApiInfo()
        info.forEach(e => {
            Country.findOrCreate({
                where:{
                    id:e.id,
                    name:e.name,
                    flags:e.img,
                    continent:e.continent,
                    capital:e.capital,
                    subregion:e.subregion,
                    area:e.area,
                    population:e.population}
            })
        });
        const countri=await Country.findAll()
        return countri
    } catch (error) {
        console.log(error)
    }
}
router.get('/activities',async(req,res)=>{
    const activities=await activiDb()
    res.status(200).send(activities)
})

router.get('/countries',async(req,res)=>{
    const name=req.query.name
    const infoD=await counDb()
    if (name) {
        let counN=await infoD.filter(n=>n.name.toLowerCase().includes(name.toLowerCase()))
        console.log(counN)
        counN.length?
        res.status(200).send(counN):
        res.status(404).send("No esta el pais")
    }else{
        res.status(200).send(infoD)
    }
})
router.get('/countries/:id', async (req,res)=>{
    const id=req.params.id
    const all=await counDb()
    if (id) {
        let filtro=await all.filter(e=>e.id==id)
        filtro.length?
        res.status(200).json(filtro):
        res.status(404).send("No lo encontre")
    }
})

router.post("/activities", async (req,res)=>{
    let{
        name,
        difficult,
        duration,
        season,
        country
    }= req.body
    let activitiesCre=await Activities.create({
        name,
        difficult,
        duration,
        season
    })
    let countryDb=await Country.findAll({
        where:{name:country}
    })
    activitiesCre.addCountry(countryDb)
    res.send('Actividad creada')

})
router.get('/countriesByActivity/:id', async (req,res)=>{
    const id=req.params.id
    let activitiesDb=await Activities.findAll({
        where:{id:id},
        include:Country
    })
    res.status(200).send(activitiesDb)
})

router.get('/countriesAc/:id',async (req,res)=>{
    const id=req.params.id
    let countAD=await Country.findAll({
        where:{id:id},
        include:Activities
    })
    console.log(countAD)
    res.status(200).send(countAD)
})


module.exports = router;
