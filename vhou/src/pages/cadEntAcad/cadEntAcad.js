import React from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { customAlphabet } from 'nanoid';

// Import de API
import api from '../../pages/api';

import Navbar from '../../components/navbar/navbar';

const CadEntAcad = () => {
  return(
    <>
      <Navbar pathname={"/admin/"} isAdmin={true}/>
      <p>Teste</p>
    </>
  );
}

export default CadEntAcad;