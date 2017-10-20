import React from 'react';

export default class RecipeTile extends React.Component {
  constructor(props) {
     super(props);

    this.state = {
      rating: null
    }
  }

  componentDidMount = () => {
    this.pullRatings();
  }

  pullRatings = () => {
    const ratings = JSON.parse(localStorage.ratings);
    const parentTile = document.getElementsByClassName(`recipe-tile-${this.props.tileInstance}`)[0];
    const tinyStars  = parentTile.getElementsByClassName('tiny-star-path');
    ratings.forEach( (item) => {
        if (item.key === this.props.recipe.id){
          this.setState({rating: item.rating}, ()=>{
              for (let i =0; i < tinyStars.length; i ++){
                if (tinyStars[i].getAttribute('data-star') <= this.state.rating){
                  tinyStars[i].style.fill = 'red';
                }
              }
          });
        }
    })
  }

  favFlag = () => {
    if (this.props.fav.indexOf(this.props.recipe.id) > -1){
      return (
        <div className='fav-button'>
          <svg className='heart' width='28.8' height='24' viewBox='0 0 24 20' preserveAspectRatio='xMidYMid meet' xmlns='http://www.w3.org/2000/svg' aria-labelledby='a11y--id a11y--id-desc' >
              <path d='M12.2204462,6.73523319 C12.1365545,6.90041775 12.0637047,7.10799331 11.9999269,7.34869081 C11.9361948,7.10799331 11.8632076,6.90041775 11.7793159,6.73523319 C10.5709724,4.35444956 7.51174163,3.33400439 4.9463771,4.45560119 C2.38247872,5.57685784 1.28240188,8.4150135 2.49069953,10.7956696 C3.69885972,13.1762406 11.9979109,20 11.9979109,20 C12.0018054,20 20.3009482,13.1762406 21.5090167,10.7956696 C22.7173602,8.4150135 21.6188411,5.57685784 19.0532933,4.45560119 C16.4887077,3.33400439 13.428698,4.35444956 12.2204462,6.73523319 Z' fill='#91c11e' stroke='#91c11e' strokeWidth='1' fillRule='evenodd'>
              </path>
          </svg>
        </div>
      )
    } else {
      return (
        <div className='fav-button' style={{'display':'none'}}>
           <svg className='heart' width='28.8' height='24' viewBox='0 0 24 20' preserveAspectRatio='xMidYMid meet' xmlns='http://www.w3.org/2000/svg' aria-labelledby='a11y--id a11y--id-desc' >
              <path d='M12.2204462,6.73523319 C12.1365545,6.90041775 12.0637047,7.10799331 11.9999269,7.34869081 C11.9361948,7.10799331 11.8632076,6.90041775 11.7793159,6.73523319 C10.5709724,4.35444956 7.51174163,3.33400439 4.9463771,4.45560119 C2.38247872,5.57685784 1.28240188,8.4150135 2.49069953,10.7956696 C3.69885972,13.1762406 11.9979109,20 11.9979109,20 C12.0018054,20 20.3009482,13.1762406 21.5090167,10.7956696 C22.7173602,8.4150135 21.6188411,5.57685784 19.0532933,4.45560119 C16.4887077,3.33400439 13.428698,4.35444956 12.2204462,6.73523319 Z' fill='#91c11e' stroke='#91c11e' strokeWidth='1' fillRule='evenodd'>
              </path>
          </svg>
        </div>
      )
    }
  }

  render = () => {
      return (
        <div  className={`recipe-tile ${this.props.className}`}  onClick={()=>{this.props.onClick(this.props.recipe)} }>
          <img className='recipe-image' src={this.props.recipe.thumb} alt='recipe image'/>
          <div className='recipe-caption'>
            <div className='top-copy'>
              <div className='recipe-name recipe-copy'>{this.props.recipe.name}</div>
              <div className='recipe-headline recipe-copy'>{this.props.recipe.headline}</div>
            </div>
              <div className='bottom-copy'>
                 <div className='recipe-cals recipe-copy'>{this.props.recipe.calories}</div>
                 <div className='recipe-time recipe-copy'>{this.props.mutateTime(this.props.recipe.time)}</div>
                 {this.favFlag()}
                  <div className='rating'>
                    <span ><svg className='tiny-star' width='16' height='16' viewBox='0 0 16 16' preserveAspectRatio='xMidYMid meet' xmlns='http://www.w3.org/2000/svg' aria-labelledby='a11y--id a11y--id-desc' ><title id='a11y--id' ></title><desc id='a11y--id-desc' ></desc><g fill='none' fillRule='evenodd' ><path d='M0 0h16v16H0z' ></path><path className='star-path star-1 tiny-star-path' data-star='1' fill='#eceae6' d='M8 11.646L11.708 14l-.981-4.44L14 6.576l-4.315-.39L8 2 6.315 6.185 2 6.575l3.273 2.986L4.292 14z' ></path></g></svg></span>
                    <span ><svg className='tiny-star' width='16' height='16' viewBox='0 0 16 16' preserveAspectRatio='xMidYMid meet' xmlns='http://www.w3.org/2000/svg' aria-labelledby='a11y--id a11y--id-desc' ><title id='a11y--id' ></title><desc id='a11y--id-desc' ></desc><g fill='none' fillRule='evenodd' ><path d='M0 0h16v16H0z' ></path><path className='star-path star-2 tiny-star-path' data-star='2' fill='#eceae6' d='M8 11.646L11.708 14l-.981-4.44L14 6.576l-4.315-.39L8 2 6.315 6.185 2 6.575l3.273 2.986L4.292 14z' ></path></g></svg></span>
                    <span ><svg className='tiny-star' width='16' height='16' viewBox='0 0 16 16' preserveAspectRatio='xMidYMid meet' xmlns='http://www.w3.org/2000/svg' aria-labelledby='a11y--id a11y--id-desc' ><title id='a11y--id' ></title><desc id='a11y--id-desc' ></desc><g fill='none' fillRule='evenodd' ><path d='M0 0h16v16H0z' ></path><path className='star-path star-3 tiny-star-path' data-star='3' fill='#eceae6' d='M8 11.646L11.708 14l-.981-4.44L14 6.576l-4.315-.39L8 2 6.315 6.185 2 6.575l3.273 2.986L4.292 14z' ></path></g></svg></span>
                    <span ><svg className='tiny-star' width='16' height='16' viewBox='0 0 16 16' preserveAspectRatio='xMidYMid meet' xmlns='http://www.w3.org/2000/svg' aria-labelledby='a11y--id a11y--id-desc' ><title id='a11y--id' ></title><desc id='a11y--id-desc' ></desc><g fill='none' fillRule='evenodd' ><path d='M0 0h16v16H0z' ></path><path className='star-path star-4 tiny-star-path' data-star='4' fill='#eceae6' d='M8 11.646L11.708 14l-.981-4.44L14 6.576l-4.315-.39L8 2 6.315 6.185 2 6.575l3.273 2.986L4.292 14z' ></path></g></svg></span>
                  </div>
              </div>
          </div>
      </div>)
  }
}
