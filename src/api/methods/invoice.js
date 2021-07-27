import api from '../constants';
import {getToken} from 'shared/utils';

const invoice = {
  INVOICE: '/admin/invoice',
};

export const getInvoice = async id => {
  try {
    const token = await getToken();
    const values = {
      id,
    };
    const {data} = await api.post(invoice.INVOICE, values, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const verifyInvoice = async id => {
  try {
    const token = await getToken();
    const {data} = await api.get(`/admin/invoice/verify/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const verifiedData = data;
    console.log(data);
    return verifiedData;
  } catch (err) {
    throw err;
  }
};
