import ACCESS_ENUM from "@/access/accessEnum";

/**
 *通用方法==检查权限
 * @param loginUser 当前登录用户
 * @param needAccess 需要的权限
 * @return Boolean 是否有权限
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  //获取当前用户所拥有的权限
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  //登录的用户才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    //只要不是未登录就可以访问
    if (loginUserAccess !== ACCESS_ENUM.NOT_LOGIN) {
      return true;
    }
  }
  //管理员才能访问
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUserAccess === ACCESS_ENUM.ADMIN) {
      return true;
    }
  }
  return false;
};
export default checkAccess;
