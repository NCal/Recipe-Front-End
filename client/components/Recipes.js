import React from 'react';
import axios from 'axios';
import RecipeTile from './RecipeTile';
import SingleView from './SingleView';

export default class Recipes extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        recipes: null,
        singleView: false,
        singleRecipe: null,
        fav: [],
        rating: null,
      }
    }

  componentWillMount = () => {
    this.getRecipes();
    if (!localStorage.fav){localStorage.fav = JSON.stringify([])}
    if (!localStorage.ratings){localStorage.ratings = JSON.stringify([])}

  }

  componentDidMount = () => {
    this.setState({fav: JSON.parse(localStorage.fav)});
  }

  getRecipes = () => {
    const self = this;
    axios.get('../data/recipes.json')
      .then(function (res) {
        self.setState({recipes: res.data});
      });
  }

  renderRecipes = (recipes) => {
    recipes.map( (rec, i) => {
      return <div className='recipe-tile'>{rec.description}</div>
    });
  }

  getBody = () => {
    const body = document.getElementsByTagName('body')[0];
    return body;
  }

  getModal = () => {
    const modal = document.getElementsByClassName('modal-bg')[0];
    return modal;
  }  

  singleViewOn = (recipe) => {
    const self = this;
    this.setState({singleView: true, singleRecipe: recipe}, ()=>{
      self.getBody().style.overflow = 'hidden';
      self.getModal().style.display = 'block';
    });
  }

  singleViewOff = () => {
    const self = this;
    this.setState({singleView: false, fav: JSON.parse(localStorage.fav) }, ()=>{
      self.getBody().style.overflowY = 'visible';
      self.getModal().style.display = 'none';
    });
  }

  mutateTime(time){
    time = time.split('');
    time.splice(0,2);
    time.splice(2,1);
    time = time.join('');
    return `Prep Time: ${time} Minutes`;
  }

  render = () => {
    if (this.state.singleView){
      return (<div>
            <div className='recipes'>
              <h1>Recipes</h1>
              {this.state.recipes.map( (rec, i) => {
                return <RecipeTile key={`rec-${i}`} className={`recipe-tile-${i}`} tileInstance={i} recipe={rec} onClick={this.singleViewOn} fav={this.state.fav} mutateTime={this.mutateTime}/>
              })} 
            </div>
            <div className='single-recipe-container'>
              <SingleView recipe={this.state.singleRecipe} singleViewOff={this.singleViewOff} mutateTime={this.mutateTime}/>
            </div>
      </div>)
    } else {
      if (this.state.recipes){
        return (
          <div className='recipes'>
            <h1>Recipes</h1>
            {this.state.recipes.map( (rec, i) =>{
              return <RecipeTile key={`rec-${i}`} className={`recipe-tile-${i}`} tileInstance={i} recipe={rec} onClick={this.singleViewOn} fav={this.state.fav} mutateTime={this.mutateTime}/>
            })} 
          </div>);
        } else {
          return (<div>
            {/*loading...*/}
          </div>)
      }
    }  
  }
}
