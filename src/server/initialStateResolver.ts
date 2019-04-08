import fs from 'fs'
import { InitialState, Course, CoursePageState, ExercisesState, AdminPageState } from '../types/InitialState'

interface ContentConfig {
  id: string
  courseName: string
  quickLinks: string[]
  contentFiles: Array<{ version: string; path: string }>
}

const contentConfig: ContentConfig[] = JSON.parse(fs.readFileSync('./content/content_config.json', 'utf8'))
// const idyllConfig: ContentConfig = JSON.parse(fs.readFileSync('./content/index.idl', 'utf-8'))

export function resolveInitialState(path: string): { pageState: InitialState; coursePageState: CoursePageState; exercises: ExercisesState, adminPageState: AdminPageState } {
  const courses = getCourses()

  const idToNumber: { [index: string]: string } = {}
  const courseExercises: { [index: string]: string[] } = {}
  const newCourses = courses.map(c => {
    const newCourseContent = c.courseContent.map(cv => {
      courseExercises[`${c.id} ${cv.version}`] = []
      let sectionCount = -1
      let exerciseCount = 0
      let theoremCount = 0
      const quickLinks: string[] = []
      const contentByLine = cv.content
        .replace('[', ' [')
        .replace(']', ']\n')
        .split('\n')

      const newContent = contentByLine
        .map(line => {
          if (line.includes('[Theorem')) {
            theoremCount++
            const firstA = line.indexOf('\'')
            const firstQ = line.indexOf('"')
            let start = 0
            let end = 0
            let headerer = ''
            if (firstQ < 0 || (firstA < firstQ && firstA > -1)) {
              start = firstA
              end = line.lastIndexOf('\'')
              headerer = `header: ${line.substring(start, end)} (teoreema ${theoremCount})'`
            } else {
              start = firstQ
              end = line.lastIndexOf('"')
              headerer = `header: ${line.substring(start, end)} (teoreema ${theoremCount})"`
            }

            const realLine = `[Theorem ${headerer}]`
            return realLine
          }

          const contentByWord = line.split(' ')
          contentByWord.forEach(word => {
            if (word.includes('[CourseSection')) {
              sectionCount++
              exerciseCount = 0
            }

            if (word.includes('UUID:')) {
              exerciseCount++
              const UUID = word.substring(6, word.length - 1)
              courseExercises[`${c.id} ${cv.version}`].push(UUID)
              idToNumber[UUID] = `${sectionCount}.${exerciseCount}`
            }
          })
          return line
        })
        .join('\n')
        .replace(']\n', ']')

      return { ...cv, content: newContent }
    })

    return { ...c, courseContent: newCourseContent }
  })

  return {
    pageState: {
      courses: newCourses || '',
      pageParams: {
        path,
        pathParams: {},
        user: null
      },
      error: {
        message: '',
        visible: false
      }
    },
    coursePageState: {
      selectedCourseVersion: null,
    },
    exercises: {
      idToNumber,
      courseExercises
    },
    adminPageState: {
      ownCourses: [],
      teacherCourses: []
    }
  }
}

function getCourses(): Course[] {
  return contentConfig.map(({ id, courseName, quickLinks, contentFiles }) => {
    const courseContent: Array<{ version: string; content: string; quickLinks: string[] }> = contentFiles.map(({ version, path }) => ({
      version,
      content: fs.readFileSync(path, 'utf8'),
      quickLinks: []
    }))
    return {
      id,
      courseName,
      quickLinks,
      courseContent
    }
  })
}

function resolveCourseTabFromPath(path: string) {
  return path.split('tab')[1]
}
