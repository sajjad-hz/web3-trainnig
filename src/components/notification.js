import React from 'react';
import { notification } from 'antd';

const MyNotif = (type, title, des) => {
  notification[type]({
    message: title,
    description: des
  });
};

export default MyNotif;