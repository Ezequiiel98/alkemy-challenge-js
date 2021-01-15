import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../../context/AuthContext';
import { getOperationByIdService, updateOperationService } from '../../services/operations.service';
import ContainerApp from '../../components/ContainerApp';
import FormOperations from '../../components/FormOperations';

function UpdateOperation(props) {
  const [form, setForm] = useState({
    amount: '', date: '', type: 'entry', description: '', sending: false,
  });
  const [formErrors, setFormErrors] = useState({ amount: '', description: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [dataAuth] = useContext(AuthContext);

  useEffect(() => {
    const getOperation = async () => {
      const { id } = props.match.params;
      try {
        const res = await getOperationByIdService(id, dataAuth.token);
        setForm({ ...res.data, sending: false });
      } catch {
        props.history.push('/');
      }

      setIsLoading(false);
    };
    getOperation();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm((lastValues) => ({ ...lastValues, [name]: value }));
    setFormErrors((lastValues) => ({ ...lastValues, [name]: '' }));
  };

  const sendOperation = async (data) => {
    setForm((lastForm) => ({ ...lastForm, sending: true }));

    try {
      const { id } = props.match.params;
      await updateOperationService(id, data, dataAuth.token);

      setForm({
        amount: '', date: '', type: 'entry', description: '', sending: false,
      });

      props.history.push('/operations');
    } catch (err) {
      const { path, message } = err.response.data;
      setFormErrors((errors) => ({ ...errors, [path || 'amount']: message }));
    }

    setForm((lastForm) => ({ ...lastForm, sending: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      amount, description, type, date,
    } = form;
    const amountIsValid = (amount).toString().length > 0 && (amount).toString().length < 10;
    const descriptionIsValid = description.length > 5 && description.length < 30;
    const dateValid = date || new Date();

    if (!amountIsValid) {
      setFormErrors((last) => ({ ...last, amount: 'Amount must be between 1 and 10 characters' }));
    }

    if (!descriptionIsValid) {
      setFormErrors((last) => ({ ...last, description: 'Description must be between 5 and 30 characters' }));
    }

    if (amountIsValid && descriptionIsValid) {
      sendOperation({
        amount, description, type, date: dateValid,
      });
    }
  };

  return (
    <ContainerApp showLoader={isLoading}>
      <FormOperations
        data={form}
        errors={formErrors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        updated
      />
    </ContainerApp>
  );
}

UpdateOperation.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default UpdateOperation;
