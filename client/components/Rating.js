import React from 'react';

const Star = (props) => 
  <span >
    <svg width='30' height='30' viewBox='0 0 16 16' preserveAspectRatio='xMidYMid meet' xmlns='http://www.w3.org/2000/svg' aria-labelledby='a11y--id a11y--id-desc' >
    <title id='a11y--id' ></title>
    <desc id='a11y--id-desc' ></desc>
      <g fill='none' fillRule='evenodd' >
        <path d='M0 0h16v16H0z' ></path>
        <path onClick={props.starSelect} data-star={props.num} className={`star-path single-view-star star-${props.num}`}  fill='#eceae6' d='M8 11.646L11.708 14l-.981-4.44L14 6.576l-4.315-.39L8 2 6.315 6.185 2 6.575l3.273 2.986L4.292 14z' ></path>
      </g>
    </svg>
  </span>;


export default class Rating extends React.Component {
  constructor(props){
    super(props);

    this.state= {
       rating: null
    };
  }

  componentWillMount = () => {
    const ratings = JSON.parse(localStorage.ratings);
    const stars = document.getElementsByClassName('single-view-star');

    ratings.forEach( (item) => {
      if (item.key === this.props.recipeId){
        this.setState({rating: item.rating}, ()=>{
          for (let i =0; i < stars.length; i ++){
            if (stars[i].getAttribute('data-star') <= this.state.rating){
              stars[i].style.fill = 'red';
            }
          }
        });
      }
    });
  }

  starSelect = (e) => {
    console.log('star select');
    const recipeId = this.props.recipeId;
    const stars = document.getElementsByClassName('single-view-star');
    // set all stars to gray
    for (let i = 0; i < stars.length; i ++){
      if (stars[i].getAttribute('data-star') <= this.state.rating){
        stars[i].style.fill = '#eceae6';
      }
    }
    // set the rating state
    this.setState({
      rating: e.target.getAttribute('data-star')
    }, () => {
      const storedRatings = JSON.parse(localStorage.getItem('ratings'));
      storedRatings.forEach( (item, i) => {
        if (item.key === recipeId){
          storedRatings.splice(storedRatings[i], 1)
        }
      });
      
      // create new ratings object with new recipe id and ratings
      const ratingsObj = {}
      ratingsObj.key = recipeId;
      ratingsObj.rating = this.state.rating;

      storedRatings.push(ratingsObj);
      // send new ratings to local storage
      localStorage.setItem('ratings', JSON.stringify(storedRatings));

      // set stars to red 
      for (let i =0; i < stars.length; i ++){
        if (stars[i].getAttribute('data-star') <= this.state.rating){
          stars[i].style.fill = 'red';
        }
      }
    });
  }

  render(){ 
    const stars = [];
    for (let i=1; i <= 4; i++){
      stars.push(<Star starSelect={this.starSelect} num={i} key={`starKey_${i}`}/>)
    };

    return (
      <div className='single-view-rating'>
        {stars}
      </div>
     )
  }
}
