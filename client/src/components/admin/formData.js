export const addProductData = {
  title: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Title',
    },
    value: '',
  },
  price: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Price',
    },
    value: '',
  },
  description: {
    elementType: 'textarea',
    elementConfig: {
      type: 'text',
      placeholder: 'Description',
    },
    value: '',
  },
  keywords: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Keywords',
    },
    value: '',
  },
};

export const editFormData = (props) => ({
  title: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Title',
    },
    value: props.Name,
    label: 'Edit title:',
  },
  price: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Price',
    },
    value: props.Price,
    label: 'Edit price:',
  },
  description: {
    elementType: 'textarea',
    elementConfig: {
      type: 'text',
      placeholder: 'Description',
    },
    value: props.Description,
    label: 'Edit description:',
  },
  keywords: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Keywords',
    },
    value: props.Keywords,
    label: 'Edit Keywords',
  },
});
