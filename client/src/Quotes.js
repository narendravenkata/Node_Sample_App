import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import qs from 'qs';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')
class Quotes extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            quotes: [],
            modalIsOpen: false,
            name: '',
            quote: '',
            isEditEnabled: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);


        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleQuoteChange = this.handleQuoteChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.actionFormatter = this.actionFormatter.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.

    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
        // console.log(this.state.name);
    }

    handleQuoteChange(e) {
        this.setState({ quote: e.target.value });
        //console.log(this.state.quote);
    }
    handleSubmit() {

        let obj = {
            name: this.state.name,
            quote: this.state.quote
        };

        console.log(obj);

        console.log(this.state._id);

        if (this.state.isEditEnabled) {
            console.log("In edit enabled")
            let url = `http://localhost:3090/api/quotes/${this.state._id}`;
            console.log(url);
            var data = {
                name: this.state.name,
                quote: this.state.quote
            }
            axios.put(url, {
                name: this.state.name,
                quote: this.state.quote
            }).then((response) => {
                console.log(response);
                console.log("Success");
            })
                .catch((error) => {
                    console.log(error);
                });

        }

        
        else {
            axios.post("http://localhost:3090/api/quotes", {
                name: this.state.name,
                quote: this.state.quote
            });
        }
        this.handleOnClick();



    }

    handleEditUser(row) {
        // handles when edit button is clicked on a row
        this.setState({
            modalIsOpen: true,
            name: row.name,
            quote: row.quote,
            _id: row._id,
            isEditEnabled: true
        });

        console.log(row);

    }

    handleDeleteRow(row) {
        //handle when delete button is clicked on a row
        console.log("In delete row");
        console.log(row);
        let url = `http://localhost:3090/api/quotes/${row._id}`;
        axios.delete(url)
            .then(res => {
                console.log('Quote deleted');
            })
            .catch(err => {
                console.error(err);
            });

    }


    handleOnClick() {
        axios.get("http://localhost:3090/api/quotes")
            .then(res => {
                const persons = res.data;
                console.log(persons);
                this.setState({ quotes: persons });
            })
    }

    actionFormatter(cell, row) {
        if (row._id) {
            return <div>

                <button type='button' className="btn btn-primary" title="Edit User" onClick={(e) => this.handleEditUser(row)}>
                    <span className="glyphicon glyphicon-edit"></span>
                </button> &nbsp;
                <button type='button' className="btn btn-danger" title="Delete User" onClick={(e) => this.handleDeleteRow(row)}>
                    <span className="glyphicon glyphicon-trash"></span>
                </button>
            </div>
        }
    }
    render() {

        var sizePerPageList = [5, 10];

        if (this.state.quotes && this.state.quotes.length > 10) {
            for (var i = 15; i < this.state.quotes.length + 5; i += 5) {
                sizePerPageList.push(i);
            }
        }

        const options = {
            expandRowBgColor: 'rgb(242, 255, 163)',
            expandBy: 'column',
            sizePerPageList: sizePerPageList,
            //expandBy: 'column'  // Currently, available value is row and column, default is row
            prePage: 'Prev', // Previous page button text
            sizePerPage: 5,
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'bottom', // default is bottom, top and both is all available
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
            clearSearch: true
        }
        return (
            <div className="Quotes">
                <div>
                    <BootstrapTable data={this.state.quotes}
                        search
                        pagination={true}
                        height={300} scrollTop={'Bottom'}
                        options={options}
                        ref='table'>
                        <TableHeaderColumn dataField='_id' isKey hidden>Product ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='quote'>Quotation</TableHeaderColumn>
                        <TableHeaderColumn width='150' editable={false} dataField='action' headerAlign='center' dataAlign='center' dataFormat={this.actionFormatter} export={false}>Actions </TableHeaderColumn>

                    </BootstrapTable>
                </div>
                <button onClick={this.handleOnClick}>Get Quotes</button>
                <br />
                <br />
                <button onClick={this.openModal}>Add Quote</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div> <form >
                        <label>
                            Name:
                         <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                        </label>
                        <br />
                        <label>
                            Quote:
                             <input type="text" value={this.state.quote} onChange={this.handleQuoteChange} />
                        </label>
                        <button type="primary" onClick={this.handleSubmit}>Submit</button>
                    </form> </div>
                </Modal>
            </div>

        );
    }
}
export default Quotes;
