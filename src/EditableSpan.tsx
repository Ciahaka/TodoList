import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
  title: string
  changeTitle: (editedTitle: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = ({title, changeTitle}) => {
  const [text, setText] = useState<string>(title)
  const [editMode, setEditMode] = useState<boolean>(false)
  const onChangeSetText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }
  const onKeyDownChangeTitle = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && offEditMode()
  const onEditMode = () => {
    setEditMode(true)
  }
  const offEditMode = () => {
    setEditMode(false)
    changeTitle(text)
  }
  return (
    editMode
      ? <TextField
        variant={'standard'}
        color={'primary'}
        value={text}
        onChange={onChangeSetText}
        onKeyDown={onKeyDownChangeTitle}
        onBlur={offEditMode}
        autoFocus
      />
      // <input
      //       value={text}
      //       onChange={onChangeSetText}
      //       onKeyDown={onKeyDownChangeTitle}
      //       onBlur={offEditMode}
      //       autoFocus
      //   />
      : <span onDoubleClick={onEditMode}>{title}</span>
  );
};

export default EditableSpan;