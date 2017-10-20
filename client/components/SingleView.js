import React from 'react';
import FavButton from './FavButton';
import Rating from './Rating';

export default class SingleView extends React.Component {
  constructor(props){
    super(props)
    this.state = { id: null, fav: null };
  }

  componentWillMount = () => {
    this.setState({
      id: this.props.recipe.id,
      fav: JSON.parse(localStorage.fav).indexOf(this.props.recipe.id) > -1
    });
  }

  setFav = () => {
    this.setState({fav: !this.state.fav}, () => {
      const fav = JSON.parse(localStorage.fav);
      if (this.state.fav){
        fav.push(this.state.id)
      } else {
        const index = fav.indexOf(this.state.id);
        if (index > -1) {
          fav.splice(index, 1);
        }
      }
      localStorage.setItem( 'fav', JSON.stringify(fav));
    });
  }

  render = () => {
    return (
      <div className='single-recipe'>
        <div className='close-single-recipe' onClick={this.props.singleViewOff}>X</div>
        <div className='single-recipe-header'>
          <h1 className='single-recipe-title'>{this.props.recipe.name}</h1>
          <p className='single-recipe-headline'>{this.props.recipe.headline}</p>
          <Rating recipeId={this.props.recipe.id}/>
          <FavButton setFav={this.setFav} fav={this.state.fav}/>
          <div className='low-copy'>
            <p className='single-recipe-time'>{this.props.mutateTime(this.props.recipe.time)}</p>
            <p className='single-recipe-cals'>{this.props.recipe.calories}</p>
          </div>
        </div>
        <div className='image-container'><img src={this.props.recipe.thumb} alt='recipe image'/></div>
        <p className='single-recipe-description'>{this.props.recipe.description}</p>

        <ul>
          <h4 className='ingredients-title'>Ingredients</h4>
          {this.props.recipe.ingredients.map((item, i)=>{
            return <li className='ingredient' key={`ingredient-${i}`}>{item}</li>
          })}
        </ul>
      </div>
    )
  }
}
