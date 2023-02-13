// 使用context保存用户信息，
// 也可以用redux，只是本项目比较简单，不需要这么麻烦
import React from 'react';
import axios from 'axios'
import { createContext, useState, useEffect } from 'react';


// 创建context
export const AuthContext = createContext();

// 创建该context的大生产者包含整个app
export const AuthContextProvider = ({children}) =>{

    // 初始化用户信息
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    const login  = async (inputs) =>{
        const res = await axios.post('http://localhost:8800/api/auth/login',inputs)
        // TODO 服务端返回的结果包含什么信息
        console.log(res.json)
        setCurrentUser(res.data.username);
    }
    const logout = async () =>{
        await axios.post('http://localhost:8800/api/auth/logout');
        setCurrentUser(null);
    }

    // 使用useEffect依赖currentUser同步更新localStorage中数值
    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(currentUser));
    }, [currentUser])

    return(
        // 核心部分，共享数据包括currentUser，login, logout
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

}
