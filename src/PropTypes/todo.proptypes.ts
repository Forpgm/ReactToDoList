import PropTypes from 'prop-types'

export const TodoType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired
})
