import axios from 'axios'
import { resolveUri } from '../utils/environmentResolvers'
import { TeachingInstance } from '../types/jsontypes'

const baseUrl = resolveUri()

const HTTP = axios.create()

const joinTeachingInstanceService = async (coursekey: string): Promise<any> => {
  try {
    const response = await HTTP.patch(`${baseUrl}/teachinginstances`, { coursekey }, getRequestConfig())
    return response.data
  } catch (e) {
    throw new Error(e.response.data.error)
  }
}

const leaveTeachingInstanceService = async (coursekey: string): Promise<any> => {
  const response = await HTTP.delete(`${baseUrl}/teachinginstances/${coursekey}?teacher=false`, getRequestConfig())
  return response.data
}

const deleteTeachingInstanceService = async (coursekey: string): Promise<any> => {
  const response = await HTTP.delete(`${baseUrl}/teachinginstances/${coursekey}?teacher=true`, getRequestConfig())
  return response.data
}

const ownCourses = async (): Promise<any> => {
  const { data } = await HTTP.get(`${baseUrl}/teachinginstances?teacher=false`, getRequestConfig())
  return data
}

const teacherCourses = async (): Promise<any> => {
  const { data } = await HTTP.get(`${baseUrl}/teachinginstances?teacher=true`, getRequestConfig())
  return data
}

const createTeachingInstance = async (instance: TeachingInstance): Promise<any> => {
  try {
    const response = await HTTP.post(`${baseUrl}/teachinginstances`, instance, getRequestConfig())
    return response.data
  } catch (e) {
    throw new Error(e.response.data.error)
  }
}

const trafficlight = async (coursekey: string, UUID: string, status: string): Promise<any> => {
  const { data } = await HTTP.put(`${baseUrl}/trafficlights/${UUID}`, { coursekey, status }, getRequestConfig())

  return data
}

const getRequestConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('ko_token') : ''}`
    }
  }
}

export default { joinTeachingInstanceService, leaveTeachingInstanceService, deleteTeachingInstanceService, createTeachingInstance, ownCourses, trafficlight, teacherCourses }
