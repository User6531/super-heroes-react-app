import React from 'react';
import Header from '../header/header';
import "./app.scss"; 
import RandomHero from '../randomHero/randomHero';
import HeroList from '../heroList/heroList';
import Hero from '../hero/hero';
import Footer from '../footer/footer';
import Error from '../error/error';

export default class App extends React.Component {

  componentDidCatch() {
    console.error('componentDidCatch-App');
    this.setState({
      error: true,
      errorMessage: 'componentDidCatch-App',
    });
  }

  state = {
    showRandomHero: false,
    heroId: null,
    error: false,
    errorMessage: null,
  }

  toogleRandomHero = () => {
    this.setState(prevState=>({
      showRandomHero: !prevState.showRandomHero,
    }));

  }

  changeHero = (id) => {
    this.setState({
      heroId: id,
    })
  }
  
  render() {
    const {showRandomHero, heroId, error, errorMessage} = this.state;

    if (error) {
      return <Error />
    }


    let randomHeroText, randomHero;
    if (showRandomHero === false) {
      randomHeroText = '▼ Open Random Hero'; 
      randomHero = null;
    } else {
      randomHeroText = '✖ Close Random Hero';
      randomHero = <RandomHero errorMessage={errorMessage}/>;
    }

    return (
      <div className="page">
        <Header />
        <div className="main">
          <button 
            className="random-hero-button"
            onClick={this.toogleRandomHero}
          >{randomHeroText}</button>
          {randomHero}
          <HeroList changeHero={(id)=> this.changeHero(id)}/>
          <Hero heroId={heroId}/>
        </div>
        <Footer />
      </div>
    )
  }
}