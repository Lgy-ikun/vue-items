import Mock from 'mockjs'
import {handleRegister, handleLogin} from '@/mock/api/login'
Mock.mock('/api/register', 'post', handleRegister)
Mock.mock(/^\/api\/login/, 'get', handleLogin)
