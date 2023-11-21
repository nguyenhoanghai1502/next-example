'use server';

import { cookies } from 'next/dist/client/components/headers';


export const api = async (url:string, method:string = 'GET', data?:any , params?:any) => {
  const access_token = cookies().get('access_token');
  const headers = {
    Authorization: `Bearer ${access_token?.value}`,
    'Content-Type': 'application/json',
  };

  try {
    const res = await fetch(`${process.env.BASE_URL}/api/${url}`, {
      method,
      headers,
      cache:'no-store',
      body: data ? JSON.stringify(data) : null,
      
    });
    if (res.status === 401) {
      return {
        code: res.status,
        data: null,
        message: 'Phiên đăng nhập đã hết! Vui lòng đăng nhập lại!',
      };
    }

    if (res.status === 400) {
      return {
        code: res.status,
        data: null,
        message: 'Reply has been deleted!',
      };
    }

    if(res.status===201){
      return{
        code:res.status,
        data:1,
        message:'Tạo mới thành công!'
      }
    }

    if (res.ok) {
      const responseData = await res.json();
      return { code: res.status, data: responseData.data, message: 'Success!' };
    }

    // Handle other status codes if needed
    // For example, you might add specific error messages for other status codes.

    return { code: res.status, data: null, message: 'Unexpected status code' };
  } catch (error) {
    // Handle any network or fetch-related errors here
    return { code: 500, data: null, message: 'Network error' };
  }
};

export const singIn=async(username:FormDataEntryValue|null, password:FormDataEntryValue|null)=>{
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/users/login/`, {
      method:'POST',
      headers,
      cache:'no-cache',
      body: JSON.stringify({username, password}),
    });
    if (res.status === 400) {
      return {
        code: res.status,
        data: null,
        message: 'User không tồn tại hoặc mật khẩu chưa khớp!',
      };
    }

    if (res.status===200) {
      const responseData = await res.json();
      return { code: res.status, data: responseData.data, message: 'Đăng nhập thành công!' };
    }

    // Handle other status codes if needed
    // For example, you might add specific error messages for other status codes.
    return { code: res.status, data: null, message: 'Unexpected status code' };
  } catch (error) {
    // Handle any network or fetch-related errors here
    return { code: 500, data: null, message: 'Lỗi hệ thống' };
  }
}

