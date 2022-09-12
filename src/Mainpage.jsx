import * as analytics from '@dhis2/analytics'
import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import ChartPlugin from "@dhis2/data-visualizer-plugin"
//import { useSelector } from 'react-redux'
//import { sGetChart } from './chart.js'
import { useDataMutation } from '@dhis2/app-runtime'
const Mainpage = (e) => {

    const [imageURL, setImageURL] = useState("https:example.com") 
    const [convertSVG, setConvertSVG] = useState(false);
    const [message, setMessage] = useState("Not loading...");

    //const chart = useSelector(sGetChart)


    const dxMock = {
        dimension: 'dx',
        items: [
            {
                id: 'cYeuwXTCPkU',
            },
        ],
    }

    const peMock = {
        dimension: 'pe',
        items: [
            {
                id: 'LAST_12_MONTHS',
            }
        ],
    }
    
    const ouMock = {
        dimension: 'ou',
        items: [
            {
                id: 'at6UHUQatSo',
            }
        ],
    }

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        getImageURL();
    }, [convertSVG])

    const mockExtraOptions = {
        dashboard: false,
        noData: {
            text: 'No data',
        },
    }


    

    const getImageURL = async () => {
        //return "hri"
        //console.log("print")
        //setMessage("Svg is loading..")
        
        //const res = createVisualizationMock.visualization.getSVGForExport();
        //console.log(res);
        const element = document.getElementById("234").children[0].children[0].children[0].children[0].innerHTML//.children[0];
        //console.log(element)

        let formData = new URLSearchParams();
        formData.append('filename', 'png-image');
        formData.append('svg', element);

        let imgUrl = "";

        
        //const host = "https://play.dhis2.org/dev"
        const host = "http://localhost:9999"
        /*const res = await */
        fetch(host+"/api/38/svg.png",
        {
            method: "post",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
            body: formData
        }).then(response => response.blob()).catch(error => {
            //setMessage(error.message)
        })
        .then(imageBlob => {
            // Then create a local URL for that image and print it 
            const imageObjectURL = URL.createObjectURL(imageBlob);
            imgUrl = imageObjectURL;
            console.log("URL")
            console.log(imgUrl)
            //return "ooko"
            //return imgUrl
            setImageURL(imgUrl);
            setMessage("finish");
        });
        console.log(res)
        

    }

    const createVisualizationMock = {



        visualization: {
            getSVGForExport: () => '<svg />',
        },
        config: {
            getConfig: () => {},
        },
    }

 
    

    const props = {
        style: { height: 400, width : 300 },
        id: 1,
        onChartGenerated: () => setConvertSVG(true),//onSVGButton(),
        responses: [],
        extraOptions: mockExtraOptions,
        legendSets: [],
        forDashboard : true,
        visualization : {
            type: analytics.VIS_TYPE_BAR,
            columns: [dxMock],
            rows: [peMock],
            filters: [ouMock],
        }//something
    }

  return (
    <>
    <div id="234">

        <ChartPlugin {...props}/>
       
       {/* <ChartPlugin {...advancedProps}/>*/}
     
    </div>

    
      
        <p>{imageURL}<br/></p>
      <ol type="1">
        <li><a href={imageURL} download>Save image to your phone</a></li>
        <li><a href="https://wa.me/+4746802013?text=Here is your report:">Open whatsapp!</a></li>
        <li>Send a message, togheter with the image</li>
        </ol> 

    
      {/*<img src={imageURL}/>*/}
      </>
  )
}

Mainpage.propTypes = {}

export default Mainpage