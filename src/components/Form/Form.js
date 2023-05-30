import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [subject, setSubject] = useState('physical');
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject
    };
    tg.sendMessage(JSON.stringify(data));
  }, [country, street, subject, tg]);

  useEffect(() => {
    tg.onEvent('webAppButtonClicked', onSendData);
    return () => {
      tg.offEvent('webAppButtonClicked', onSendData);
    };
  }, [onSendData, tg]);

  useEffect(() => {
    tg.WebAppButton.setParams({
      text: 'Send Form'
    });
  }, [tg]);

  useEffect(() => {
    if (!street || !country) {
      tg.WebAppButton.hide();
    } else {
      tg.WebAppButton.show();
    }
  }, [country, street, tg]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className="form">
      <h3>Enter your information</h3>
      <input
        className="input"
        type="text"
        placeholder="Your country"
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className="input"
        type="text"
        placeholder="Your city"
        value={street}
        onChange={onChangeStreet}
      />
      <select value={subject} onChange={onChangeSubject} className="select">
        <option value="physical">Customer</option>
        <option value="legal">Partner</option>
      </select>
    </div>
  );
};

export default Form;
