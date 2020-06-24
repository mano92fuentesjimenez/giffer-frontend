import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import bem from 'bem-cn'
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import { changeUserPersonalData } from 'services/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'services/user/selectors';
import './ContentRating.scss'

const b = bem('scenes-user-settings-content-rating');
const marks = [
  {
    value: 1,
    label: 'G',
  },
  {
    value: 2,
    label: 'PG',
  },
  {
    value: 3,
    label: 'PG-13',
  },
  {
    value: 4,
    label: 'R',
  },
];

const ratingsValues = {
  g: {
    title: 'content_rating_g_title',
    description: 'content_rating_g_description',
  },
  pg: {
    title: 'content_rating_pg_title',
    description: 'content_rating_pg_description',
  },
  'pg-13': {
    title: 'content_rating_pg_13_title',
    description: 'content_rating_pg_13_description',
  },
  r: {
    title: 'content_rating_r_title',
    description: 'content_rating_r_description',
  },
}

const getRatingValue = (v) => {
  switch (v) {
    case 1: return 'g';
    case 2: return 'pg';
    case 3: return 'pg-13';
    case 4: return 'r';
    default: return 'g';
  }
}

const ContentRating = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userRatingValue = marks.find(m => m.label.toLowerCase() === user.contentRating).value;
  const [sliderValue, setSliderValue] = useState(userRatingValue);

  const onSliderChange = (e, value) => {
    setSliderValue(value)
  }

  const rating = getRatingValue(sliderValue);
  const onSubmitClick = () => dispatch(changeUserPersonalData({contentRating : rating }));

  return (
    <div className={b()}>
      <div className={b('settings-container')()}>
        <div>
          <div className={b('description-container')()}>
            <div className={b('description-title')()}> <FormattedMessage id={ratingsValues[rating].title}/></div>
            <div className={b('description')()}> <FormattedMessage id={ratingsValues[rating].description}/></div>
          </div>
        </div>
        <Slider
          className={b('slider')()}
          orientation="vertical"
          marks={marks}
          min={1}
          step={1}
          max={4}
          onChange={onSliderChange}
          value={sliderValue}
        />
      </div>
      <div className={b('submit-button-container')()}>
        <Button
          variant="outlined"
          color="primary"
          className={b('button')()}
          disabled={userRatingValue === sliderValue}
          onClick={onSubmitClick}
        >
          <FormattedMessage id="change" />
        </Button>
      </div>
    </div>
  )
}

export default ContentRating;