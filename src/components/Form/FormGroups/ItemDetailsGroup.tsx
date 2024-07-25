import React, { useState } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { VisibleInput } from '../CompleteForms/ItemCreateUpdateForm'
import Input from '../FormComponents/Input'
import TextArea from '../FormComponents/TextArea'

type Props = {
  control: Control<models.form.ItemCreateUpdateFormPropsType>
  visibleInputs: VisibleInput
}

const ItemDetailsGroup = (props: Props) => {
  const { control, visibleInputs } = props

  return (
    <div className="flex flex-col gap-0.5 px-5 md:grid md:grid-cols-2 md:gap-2.5">
      <Controller
        name="itemName"
        control={control}
        rules={{ required: 'Item name is required' }}
        render={({
          field: { name, onChange, value },
          fieldState: { error },
        }) => (
          <Input
            label="Item name"
            // placeholder="Top cafes in Toronto, Must watch movies, ..."
            type="text"
            name={name}
            onChange={onChange}
            value={value}
            error={error}
          />
        )}
      />
      <Controller
        name="subtitle"
        control={control}
        // rules={{ required: 'Item name is required' }}
        render={({
          field: { name, onChange, value },
          fieldState: { error },
        }) => (
          <Input
            label="Item subtitle (optional)"
            // placeholder="Top cafes in Toronto, Must watch movies, ..."
            type="text"
            name={name}
            onChange={onChange}
            value={value}
            error={error}
          />
        )}
      />
      <Controller
        name="category"
        control={control}
        // rules={{ required: 'Item name is required' }}
        render={({
          field: { name, onChange, value },
          fieldState: { error },
        }) => (
          <Input
            label="Item category (optional)"
            // placeholder="Top cafes in Toronto, Must watch movies, ..."
            type="text"
            name={name}
            onChange={onChange}
            value={value}
            error={error}
          />
        )}
      />
      <Controller
        name="itemImgUrl"
        control={control}
        // rules={{ required: 'Item name is required' }}
        render={({
          field: { name, onChange, value },
          fieldState: { error },
        }) => (
          <Input
            label="Item image (optional)"
            // placeholder="Top cafes in Toronto, Must watch movies, ..."
            type="text"
            name={name}
            onChange={onChange}
            value={value}
            error={error}
          />
        )}
      />
      {visibleInputs.rating && (
        <Controller
          name="rating"
          control={control}
          rules={{
            min: {
              value: 0,
              message: 'Rating must be between 0 and 5',
            },
            max: {
              value: 5,
              message: 'Rating must be between 0 and 5',
            },
            pattern: /^(?:[0-4](?:\.[05])?|5(?:\.0)?)$/,
          }}
          render={({
            field: { name, onChange, value },
            fieldState: { error },
          }) => (
            <Input
              label="Item rating (optional)"
              type="number"
              min={0}
              max={5}
              step={0.5}
              name={name}
              onChange={onChange}
              value={value}
              error={error}
            />
          )}
        />
      )}

      {visibleInputs.link && (
        <Controller
          name="itemUrl"
          control={control}
          // rules={{ required: 'Item name is required' }}
          render={({
            field: { name, onChange, value },
            fieldState: { error },
          }) => (
            <Input
              label="Url (optional)"
              // placeholder="Top cafes in Toronto, Must watch movies, ..."
              type="text"
              name={name}
              onChange={onChange}
              value={value}
              error={error}
            />
          )}
        />
      )}

      {visibleInputs.notes && (
        <Controller
          name="notes"
          control={control}
          // rules={{ required: 'Item name is required' }}
          render={({
            field: { name, onChange, value },
            fieldState: { error },
          }) => (
            <TextArea
              label="Notes (optional)"
              // placeholder="Top cafes in Toronto, Must watch movies, ..."
              // type="text"
              name={name}
              onChange={onChange}
              value={value}
              error={error}
            />
          )}
        />
      )}
    </div>
  )
}

export default ItemDetailsGroup
