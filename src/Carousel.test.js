import React from 'react';
import {
  render,
  fireEvent,
  queryAllByTestId,
  getByTestId,
} from '@testing-library/react';
import Carousel from './Carousel';

it('renders without crashing', function () {
  render(<Carousel />);
});

it('matches snapshot', function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it('works when you click on the right arrow', function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).not.toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).toBeInTheDocument();
});

it('works when you click on the left arrow', function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  //move forward in the carousel
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  //move back in the carousel
  const leftArrow = queryByTestId('left-arrow');
  fireEvent.click(leftArrow);

  //expect the first image to show, but not the second
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument();
});

it('expects the arrows to show correctly', function () {
  const { queryByTestId } = render(<Carousel />);
  const leftArrow = queryByTestId('left-arrow');
  const rightArrow = queryByTestId('right-arrow');

  // expect the right arrow to show, but not the left arrow
  expect(leftArrow).toHaveClass('hidden');
  expect(rightArrow).not.toHaveClass('hidden');

  // move forward in the carousel
  fireEvent.click(rightArrow);

  // expect both arrows to show on the middle image

  expect(leftArrow).not.toHaveClass('hidden');
  expect(rightArrow).not.toHaveClass('hidden');

  // move forward to the last image in the carousel
  fireEvent.click(rightArrow);

  // expect the left arrow to show, but not the right

  expect(rightArrow).toHaveClass('hidden');
  expect(leftArrow).not.toHaveClass('hidden');
});
