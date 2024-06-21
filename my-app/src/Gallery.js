
import { useState, useEffect} from 'react'

export default function Gallery () {
    const [tours, setTours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchTours() {
        try {
            const response = await fetch('https://www.course-api.com/react-tours-project');
            if (!response.ok) {
                throw new Error('Failed to fetch tour data');
          }
            const data = await response.json();
            //Initialize the showInfo property for each tour to true
            const dataWithDetails = data.map(tour => ({...tour, showInfo:true}))
            setTours(dataWithDetails);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError(error.message)
        }
      };
    
    useEffect(() => {fetchTours()}, []);

    //Display loading
    if (isLoading) {return <div className='loading'>Loading...</div>;}
    //Display error
    if (error) {return <div className='loading'>Error: {error}</div>}

    function handleReadMoreButton(id) {
        const updatedTours = tours.map(tour => {
            if (tour.id === id) {
                return {
                    ...tour, 
                    showInfo: !tour.showInfo
                }
            } else {
                return tour
            }
        })
        setTours(updatedTours);
    }
    
    return (
        <div>
            <h1 className='header'>Find Your Best Adventure</h1>
            {tours.map(tour => (
                <article key={tour.id}>
                    <div>                        
                        <h2 className="tourName"><i>{tour.name}</i></h2>
                        <p className='tourPrice'><strong>${tour.price}</strong></p><br/>
                        <img src={tour.image} atl={tour.name} width="300"/><br/>

                        {tour.showInfo ? <p className='tourInfo'>{tour.info}</p> : null}
                        <button onClick={() => handleReadMoreButton(tour.id)}>                        
                            {tour.showInfo ? 'Show Less' : 'Read More'}
                        </button>

                        <button onClick={() => {setTours(tours.filter(t => t.id !== tour.id))}}>Not Interested</button>
                    </div>
                </article>
            ))}
        </div>
    )
}

