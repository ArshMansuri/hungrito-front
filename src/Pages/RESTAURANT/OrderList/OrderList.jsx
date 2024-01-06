import React from 'react'
import './orderList.css'
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const OrderList = () => {
  return (
    <div className='order-list-table'>
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <div className="d-flex align-items-center justify-content-end">
            <div>
              <span>Search: </span>
              <input type="text" className="table-input px-2"/>
            </div>
          </div>
        </div>
        <div class="card-body w-100 overflow-scroll">
          <div class="table-responsive" style={{width: 'max-content'}}>
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead className='text-secondary'>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Office</th>
                  <th>Age</th>
                  <th>Start date</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tfoot className='text-secondary'>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Office</th>
                  <th>Age</th>
                  <th>Start date</th>
                  <th>Salary</th>
                </tr>
              </tfoot>
              <tbody className='order-list-table-body'>
                <tr>
                  <td>Tiger Nixon</td>
                  <td>System Architec</td>
                  <td>Edinburgh</td>
                  <td>61</td>
                  <td>2011/04/25</td>
                  <td>$320,800</td>
                </tr>
                <tr>
                  <td>Garrett Winters</td>
                  <td>Accountant</td>
                  <td>Tokyo</td>
                  <td>63</td>
                  <td>2011/07/25</td>
                  <td>$170,750</td>
                </tr>
                <tr>
                  <td>Ashton Cox</td>
                  <td>Junior Technical Author</td>
                  <td>San Francisco</td>
                  <td>66</td>
                  <td>2009/01/12</td>
                  <td>$86,000</td>
                </tr>
                <tr>
                  <td>Cedric Kelly</td>
                  <td>Senior Javascript Developer</td>
                  <td>Edinburgh</td>
                  <td>22</td>
                  <td>2012/03/29</td>
                  <td>$433,060</td>
                </tr>
                <tr>
                  <td>Airi Satou</td>
                  <td>Accountant</td>
                  <td>Tokyo</td>
                  <td>33</td>
                  <td>2008/11/28</td>
                  <td>$162,700</td>
                </tr>
                <tr>
                  <td>Brielle Williamson</td>
                  <td>Integration Specialist</td>
                  <td>New York</td>
                  <td>61</td>
                  <td>2012/12/02</td>
                  <td>$372,000</td>
                </tr>
                <tr>
                  <td>Herrod Chandler</td>
                  <td>Sales Assistant</td>
                  <td>San Francisco</td>
                  <td>59</td>
                  <td>2012/08/06</td>
                  <td>$137,500</td>
                </tr>
                <tr>
                  <td>Rhona Davidson</td>
                  <td>Integration Specialist</td>
                  <td>Tokyo</td>
                  <td>55</td>
                  <td>2010/10/14</td>
                  <td>$327,900</td>
                </tr>
                <tr>
                  <td>Colleen Hurst</td>
                  <td>Javascript Developer</td>
                  <td>San Francisco</td>
                  <td>39</td>
                  <td>2009/09/15</td>
                  <td>$205,500</td>
                </tr>
                <tr>
                  <td>Sonya Frost</td>
                  <td>Software Engineer</td>
                  <td>Edinburgh</td>
                  <td>23</td>
                  <td>2008/12/13</td>
                  <td>$103,600</td>
                </tr>
                <tr>
                  <td>Jena Gaines</td>
                  <td>Office Manager</td>
                  <td>London</td>
                  <td>30</td>
                  <td>2008/12/19</td>
                  <td>$90,560</td>
                </tr>
                <tr>
                  <td>Quinn Flynn</td>
                  <td>Support Lead</td>
                  <td>Edinburgh</td>
                  <td>22</td>
                  <td>2013/03/03</td>
                  <td>$342,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer bg-white py-3">
          <div className="d-flex align-items-center justify-content-center">
            <div className='mx-2'>
                <button className='first-btn all-btn border-0'>First</button>
            </div>
            <div className='mx-2'>
                <button className='all-btn border-0 d-flex justify-content-center align-items-center'>
                  <GrFormPrevious size={20} />
                </button>
            </div>
            <div className='mx-2'>
              <button className='all-btn border-0'>1</button>
            </div>
            <div className='mx-2'> 
                <button className='all-btn border-0 d-flex justify-content-center align-items-center'>
                  <GrFormNext color='#FF5B5B'size={20} />
                </button>
            </div>
            <div className='mx-2'>
                <button  className='last-btn all-btn border-0'>Last</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderList