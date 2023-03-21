/* eslint-disable unused-imports/no-unused-vars */
import * as React from 'react';
import { useState} from 'react';
import {
	Button,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Select,
} from 'antd';
import { pipe } from 'fputils';
import {IItem, TCategory} from "@/web/types";
import { toDate} from "@/web/utils";
import {toDateReadable} from "@/utils/utils";
import dayjs from "dayjs";

interface IProps {
  handleFormSubmit: ( {name, expire, count, category}:any ) => void;
  isDisplayed: boolean;
  handleFormClose: () => void;
  itemToEdit?: IItem;
}

interface IOnChangeP {
  nameI: string;
  expireI: string;
  countI: number;
  categoryI: TCategory;
}

const dateFormat = 'YYYY-MM-DD';

export const FormComponent = ( {handleFormSubmit, isDisplayed, handleFormClose, itemToEdit}: IProps ) => {
	const [name, setName] = useState<string>( itemToEdit ? itemToEdit.name : '' );
	const [expire, setExpire] = useState<any>( itemToEdit ? itemToEdit.expire : dayjs( new Date(), dateFormat ) );
	const [count, setCount] = useState<number>( itemToEdit ? itemToEdit.count : 1 );
	const [category, setCategory] = useState<TCategory>( itemToEdit ? itemToEdit.category : 'other' );

	const handleChange = ( { nameI, expireI, countI, categoryI }: IOnChangeP ) => {
		if ( nameI ) setName( nameI );
		if ( expireI ) pipe( expireI, toDate, toDateReadable, setExpire );
		if ( countI ) setCount( countI );
		if ( categoryI ) setCategory( categoryI );
	};

	const handleSubmit = async () => {
		handleFormSubmit( {name, expire, count, category} );
		setName( '' );
		setExpire( '' );
		setCount( 1 );
		setCategory( 'other' );
	};



	return (
		<Form
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 14 }}
			layout="horizontal"
			initialValues={
				{
					countI: itemToEdit ? itemToEdit.count : count,
					nameI: itemToEdit ? itemToEdit.name : name,
					categoryI: itemToEdit ? itemToEdit.category : category,
					expireI: dayjs( itemToEdit ? itemToEdit.expire : expire, dateFormat )
				}
			}
			onValuesChange={handleChange}
			onFinish={handleSubmit}
			size={'small'}
			style={{backgroundColor: 'white', border: 'solid lightgrey 1px', borderRadius: '15px', padding: '14px', position: 'fixed', left: '0', right: '0', margin: '0 10% 0 10%', zIndex: 10}}
		>
			<Form.Item label="Name" name='nameI' style={{margin: '0 30px 10px 0'}} >
				<Input />
			</Form.Item>
			<Form.Item label="Expire" name='expireI' style={{margin: '0 0 10px'}}>
				<DatePicker/>
			</Form.Item>
			<Form.Item label="Count" name='countI' style={{margin: '0 0 10px'}}>
				<InputNumber/>
			</Form.Item>
			<Form.Item label="Category" name="categoryI" style={{margin: '0 0 10px'}}>
				<Select>
					<Select.Option value="dairy">Diary</Select.Option>
					<Select.Option value="fruit">Fruit</Select.Option>
					<Select.Option value="vegetable">Vegetable</Select.Option>
					<Select.Option value="meat">Meat</Select.Option>
					<Select.Option value="egg">Egg</Select.Option>
					<Select.Option value="other">Other</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item style={{margin: '30px 0 10px'}}>
				<Button style={{width: '100px'}} type="primary" htmlType="submit">Submit</Button>
				<Button style={{width: '100px', position: 'absolute', right: '0'}} type="primary" danger ghost onClick={handleFormClose}>Close</Button>
			</Form.Item>
		</Form>
	);
	/*
  return (
    <div style={style}>
      <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      onSubmit={handleSubmit}
    >
        <label>
          Name:
          <input
            onChange={handleNameChange}
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            style={{ margin: '5px' }}
          />
        </label>
        <br />
        <label>
          Expire:
          <input
            onChange={handleExpireChange}
            type="date"
            name="expire"
            value={expire}
            style={{ margin: '5px' }}
          />
        </label>
        <br />
        <label>
          Count:
          <input
            onChange={handleCountChange}
            type="number"
            name="count"
            value={count}
            style={{ margin: '5px', width: '40px' }}
          />
        </label>
        <br />
        <input
          type="radio"
          id="Diary"
          name="category"
          value="Diary"
          onChange={handleCategoryChange}
        />
        <label style={{ marginRight: '10px' }} htmlFor="Diary">
          Diary
        </label>
        <input
          type="radio"
          id="Fruit"
          name="category"
          value="Fruit"
          onChange={handleCategoryChange}
        />
        <label style={{ marginRight: '10px' }} htmlFor="Fruit">
          Fruit
        </label>
        <input
          type="radio"
          id="Vegetable"
          name="category"
          value="Vegetable"
          onChange={handleCategoryChange}
        />
        <label style={{ marginRight: '10px' }} htmlFor="Vegetable">
          Vegetable
        </label>
        <br />
        <input
          type="radio"
          id="Egg"
          name="category"
          value="Egg"
          onChange={handleCategoryChange}
        />
        <label style={{ marginRight: '10px' }} htmlFor="Egg">
          Egg
        </label>
        <input
          type="radio"
          id="Meat"
          name="category"
          value="Meat"
          onChange={handleCategoryChange}
        />
        <label style={{ marginRight: '10px' }} htmlFor="Meat">
          Meat
        </label>
        <input
          type="radio"
          id="Other"
          name="category"
          value="Other"
          onChange={handleCategoryChange}
        />
        <label style={{ marginRight: '10px' }} htmlFor="Other">
          Other
        </label>
        <br />
        <input
          type="submit"
          value="Submit"
          style={{ margin: '5px' }}
          onChange={handleCategoryChange}
        />
      </Form>
    </div>
  );*/
};
