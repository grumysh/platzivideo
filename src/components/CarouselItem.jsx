import React from 'react';
import { connect } from 'react-redux';
import { setFavorite, deleteFavorite } from '../actions';
import PropTypes from 'prop-types';
import '../assets/styles/components/CarouselItem.scss';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png'

const CarouselItem = (props) => {
  const { id, cover, title, year, contentRating, duration, isList, myList } = props;
  const handleSetFavorite = () => {
    if (myList.find(item => item.id === id)) {
      alert("Este video ya se encuentra agregado en favoritos")
    }
    props.setFavorite({
      id, cover, title, year, contentRating, duration
    })
  }
  const handleDeleteFavorite = (itemId) => {
    props.deleteFavorite(itemId);
  }


  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={cover} alt={title} />
      <div className="carousel-item__details">
        <div>
          <img
            className="carousel-item__details--img"
            src={playIcon}
            alt="Play Icon"
          />
          {!isList ?
            < img
              className="carousel-item__details--img"
              src={plusIcon}
              alt="Plus Icon"
              onClick={handleSetFavorite}
            />
            :
            <img
              className="carousel-item__details--img"
              src={removeIcon}
              alt="Plus Icon"
              onClick={() => handleDeleteFavorite(id)}
            />
          }
        </div>
        <p className="carousel-item__details--title">{title}</p>
        <p className="carousel-item__details--subtitle">
          {`${year} ${contentRating} ${duration}`}
        </p>
      </div>
    </div>
  );
}

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
}

const mapDispatchToProps = {
  setFavorite,
  deleteFavorite
}

const mapStateToProps = state => {
  return {
    myList: state.myList,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);