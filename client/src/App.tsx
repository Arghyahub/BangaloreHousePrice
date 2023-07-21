import { useState , useEffect, ChangeEvent } from "react";
import "./App.css"

import opName from "./columns";

// import { useNavigate , Link } from "react-router-dom"
import { socials , predictJson } from "./AppInterface";

// -----------IMP-------------
const bgURL:string = "homeBg.jpg" ;
const iconURL:string = "homeIcon.png" ;
const backend:string = import.meta.env.VITE_BACK ;
// const backend:string = "http://localhost:5000" ;
// -------------------------

const Navbar = ():JSX.Element => {
    return (
      <div className="home-nav flrow acen">
        <img src={iconURL} alt="Icon" className='home-icon' />
        <h4>House Price Predictor</h4>
        <div className='navlog flrow'>
            <a href="https://github.com/Arghyahub/BangaloreHousePrice">
                <img src="githubIcon.png" alt="Icon" className='home-icon' />
            </a>
        </div>
        
      </div>
    )
}

const Contact = () => {
    const Socials:socials[] = [
      { icon: "contactImg/instagram.png" , name: "Instagram" , link: "https://www.instagram.com/argho_das_/" },
      { icon: "contactImg/linkedin.png" , name: "LinkedIn" , link: "https://www.linkedin.com/in/arghya-das-045702222/" },
      { icon: "contactImg/twitter.png" , name: "Twitter" , link: "https://twitter.com/ArghyaDas04" },
    ];

    return (
      <div id="contact" className="flcol jcen acen">
        <p className="cont-head">Contact us</p>
        <div className="flrow">
            {Socials.map((elem:socials,ind:number) => (
              <a href={elem.link} key={`social${ind}`} className="socials flrow acen">
                <img src={elem.icon} alt="icon" />
                <p>{elem.name}</p>
              </a>
            ))}
        </div>
      </div>
    )
}


const App = () => {
    const [BHK, setBHK] = useState<number>(-1) ;
    const [BATH, setBATH] = useState<number>(-1) ;
    const [Predicted, setPredicted] = useState<string>("") ;
    
    useEffect(() => {
      const coldStart = async ():Promise<void> => {
        try{
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const resp:Response = await fetch(`${backend}/`,{
            method: 'GET',
            headers: {
              "Content-Type":'application/json'
            }
          })
        }
        catch(err) {
          console.log(err) ;
        }
      }

      coldStart();
    }, [])
    
    
    const getHouseData = async (e: ChangeEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault() ;
        if (BHK==-1){
            alert("House BHK not set") ;
            return
        }
        if (BATH==-1){
            alert("House BHK not set") ;
            return
        }

        const ar:number = Number(e.target.area.value) ;
        const lc:string = e.target.location.value ;

        try {
            const resp:Response = await fetch(`${backend}/predict_home_price`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({total_sqft:ar, bhk: BHK, bath: BATH, location: lc})
            })

            const data:predictJson = await resp.json();
            setPredicted(`${data.estimated_price} Lakhs`) ;
        }
        catch(err) {
            console.log(err) ;
        }
    }

    const formBHK = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, ind:number):void => {
        e.preventDefault() ;
        setBHK(ind) ;
    }

    const formBATH = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, ind:number):void => {
        e.preventDefault() ;
        setBATH(ind) ;
    }

  return (
    <div id="Home" className="h100">

      <Navbar />
      
      <div className="flcol homebg-div jcen acen f1">
        <img src={bgURL} alt="Home" className="homebg abs"/>
        
        <form onSubmit={getHouseData} className="flcol jcen acen price-form">
            <h3 className="w100">Area in SQFT</h3>
            <input name="area" type="text" placeholder="Area per SQFT" required/>

            <h3 className="w100 ">BHK</h3>
            <div className="flrow bhkbath">
                <button onClick={(e)=> formBHK(e,1)} className={`${BHK==1? 'option-sel':'' }`}>1</button>
                <button onClick={(e)=> formBHK(e,2)} className={`${BHK==2? 'option-sel':'' }`}>2</button>
                <button onClick={(e)=> formBHK(e,3)} className={`${BHK==3? 'option-sel':'' }`}>3</button>
                <button onClick={(e)=> formBHK(e,4)} className={`${BHK==4? 'option-sel':'' }`}>4</button>
                <button onClick={(e)=> formBHK(e,5)} className={`${BHK==5? 'option-sel':'' }`}>5</button>
                <button onClick={(e)=> formBHK(e,6)} className={`${BHK==6? 'option-sel':'' }`}>6</button>
            </div>

            <h3 className="w100">Bath</h3>
            <div className="flrow bhkbath">
                <button onClick={(e)=> formBATH(e,1)} className={`${BATH==1? 'option-sel':'' }`}>1</button>
                <button onClick={(e)=> formBATH(e,2)} className={`${BATH==2? 'option-sel':'' }`}>2</button>
                <button onClick={(e)=> formBATH(e,3)} className={`${BATH==3? 'option-sel':'' }`}>3</button>
                <button onClick={(e)=> formBATH(e,4)} className={`${BATH==4? 'option-sel':'' }`}>4</button>
                <button onClick={(e)=> formBATH(e,5)} className={`${BATH==5? 'option-sel':'' }`}>5</button>
                <button onClick={(e)=> formBATH(e,6)} className={`${BATH==6? 'option-sel':'' }`}>6</button>
            </div>

            <h3 className="w100">Location</h3>
            <select name="location">
                {opName.map((elem,ind) => (
                    <option value={elem} key={`loc${ind}`}>{elem}</option>
                ))}
            </select>

            <button type="submit" className="sub-btn" >Get Price</button>
        </form>

        <h3 className="Predicted">{Predicted}</h3>
      
      </div>

      <Contact />

    </div>
  )
}

export default App