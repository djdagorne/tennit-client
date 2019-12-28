import React, { Component } from 'react';
import STORE from '../STORE'

export default class Carousel extends Component {  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };
  }

  goToSlide(index){
      this.setState({activeIndex: index})
  }
  goToPreviousSlide(e){
      e.preventDefault();
      let index = this.state.activeIndex;
      let {slides} = this.props;
      let slidesLength = slides.length;

      if(index<1){
          index=slidesLength;
      }

      this.setState({
          activeIndex: index
      })
  }
  goToNextSlide(e){
      e.preventDefault();

      
      let index = this.state.activeIndex;
      let {slides} = this.props;
      let slidesLength = slides.length -1;

      if(index === slidesLength){
          index = -1;
      }

      ++index;

      this.setState({
          activeIndex: index
      })
  }
      //TODO
    /*        {userImages.map((image, index)=>
                <div key={index}>
                    <img src={image.image} alt="test"/>
                </div>
            )} 
    */

    /* 
          <button onClick={e=>console.log(userImages)}>asd</button> 
    */
  render() {
    const {testUsers, testImages} = STORE.makeThingsFixtures()
    const userImages = testImages.filter(image => image.user_id === testUsers[0].id)
    return (
      <div className="carousel">
            <button
            className="carousel__arrow carousel__arrow--left"
            onClick={e => this.goToPrevSlide(e)}
            >
            <span className="fa fa-2x fa-angle-left" />
            </button>
            
      </div>
    );
  }
}