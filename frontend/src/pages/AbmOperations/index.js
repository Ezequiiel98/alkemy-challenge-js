import React, { useState, useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { createOperationService } from '../../services/operations.service';
import ContainerApp from '../../components/ContainerApp';
import FormOperations from '../../components/FormOperations';

import TableOperations from './components/TableOperations';
// import styles from './index.module.scss';

function AbmOperations() {
  const [form, setForm] = useState({
    amount: '', date: '', type: 'entry', description: '', sending: false,
  });
  const [formErrors, setFormErrors] = useState({ amount: '', description: '' });
  const [newOperation, setNewOperation] = useState(false);
  const [dataAuth] = useContext(AuthContext);

  const handleChange = ({ target: { name, value } }) => {
    setForm((lastValues) => ({ ...lastValues, [name]: value }));
    setFormErrors((lastValues) => ({ ...lastValues, [name]: '' }));
  };

  const sendOperation = async (data) => {
    setForm((lastForm) => ({ ...lastForm, sending: true }));

    try {
      await createOperationService(data, dataAuth.token);

      setForm({
        amount: '', date: '', type: 'entry', description: '', sending: false,
      });

      setNewOperation(!newOperation);
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
    <ContainerApp>
      <FormOperations
        data={form}
        errors={formErrors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <TableOperations newOperation={newOperation} />
    </ContainerApp>
  );
}

export default AbmOperations;
