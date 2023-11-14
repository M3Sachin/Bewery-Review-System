import React, { useEffect,useState } from 'react'
import Item from './Item';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner'
function Home(props) {
    const [data,setData]=useState([]);
    let type;
    let val;
    const history=useNavigate();
    type=localStorage.getItem('searchType');
    val=localStorage.getItem('searchValue');
    const [page,setPage]=useState(1);
    let [lendata,setDataLen]=useState(5);
    console.log(val,type);
    const firstfetch=async()=>{
    const url=`https://api.openbrewerydb.org/v1/breweries?${type?type:'by_city'}=${val?val:''}&page=${page}&per_page=6`;
    
    const datax=await fetch(url);
    const parsedData=await datax.json();
    setData(parsedData);
    setDataLen(6);
    }
    useEffect(()=>{
      if(localStorage.getItem('token')){
        firstfetch();
      }
      else{
        history('/');
      }
    },[])
    const fetchMoreData=async ()=>{
      const url=`https://api.openbrewerydb.org/v1/breweries?${type?type:'by_city'}=${val?val:''}&page=${page+1}&per_page=6`;
      setPage(page+1)
      let dataxy=await fetch(url);
      let parsedData=await dataxy.json();
      setData(data.concat(parsedData));
      console.log(parsedData);
      };
  return (
    <>
      <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={fetchMoreData}
          loader={<Spinner/>}
        >
        <div className='container ' style={{marginTop:'4rem'}}>
        <div className='row mb-3'> 
        {
          data.map((element)=>{
                return <div className='col-md-4 col-lg-4 ' key={element.id}><Item item={element}/></div>
            
        })}
       </div>
       </div>
       </InfiniteScroll>
        
    </>
  )
}

export default Home
