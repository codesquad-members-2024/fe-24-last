import React from 'react'
import { useQueryClient } from 'react-query';
import { useLocation, useParams } from 'react-router-dom'
import { columnsType } from '../components/TemplateCardWrap/TemplateCardWrap';
const Template = () => {
  const { id } = useParams()
  const location = useLocation();
  const queryClient = useQueryClient();
  const state: columnsType = location.state;

  return (
    <div>Template{id}</div>
  )
}

export default Template