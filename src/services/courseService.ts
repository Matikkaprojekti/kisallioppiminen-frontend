import axios from 'axios'
import { resolveUri } from '../utils/resolveUri'
import { TeachingInstance } from '../types/jsontypes'

const baseUrl = resolveUri()

const HTTP = axios.create({
  withCredentials: true
})

const joinTeachingInstanceService = async (coursekey: string): Promise<any> => {
  const response = await HTTP.patch(`${baseUrl}/teachinginstances`, { coursekey }, getRequestConfig())
  console.log(response)
  return response.data
}

const ownCourses = async (): Promise<any> => {
  const { data } = await HTTP.get(`${baseUrl}/teachinginstances?teacher=false`, getRequestConfig())
  console.log(data)
  return data
}

const teacherCourses = async (): Promise<any> => {
  const { data } = await HTTP.get(`${baseUrl}/teachinginstances?teacher=true`, getRequestConfig())
  console.log(data)
  return data
}

const createTeachingInstance = async (instance: TeachingInstance): Promise<any> => {
  const response = await HTTP.post(`${baseUrl}/teachinginstances`, instance, getRequestConfig())
  console.log(response)
  return response.data
}

const trafficlight = async (coursekey: string, UUID: string, status: string): Promise<any> => {
  const { data } = await HTTP.put(`${baseUrl}/trafficlights/${UUID}`, { coursekey, status }, getRequestConfig())
  console.log(data)
  return data
}

const getRequestConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('ko_token') : ''}`
    }
  }
}

export default { joinTeachingInstanceService, createTeachingInstance, ownCourses, trafficlight, teacherCourses }
