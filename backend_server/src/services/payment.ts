import { PaymentHistory } from "@src/db/models/payment_history";
import { Subscribe } from "@src/db/models/subscribe";
import { SubscriptionMenu } from "@src/db/models/subscription_menu";
import { TimeMenu } from "@src/db/models/time_menu";
import { User } from "@src/db/models/user"
import { Op } from "sequelize/types";

/**
 * @description 사용시간 충전
 * @param user 
 * @param timeMenuId 
 */
export const chargeTime = async (user: User, timeMenuId: number) => {
  const foundMenu = await TimeMenu.findByPk(timeMenuId);
  if (!foundMenu) {
    return null;
  }
  user.remainTime += foundMenu.time;
  await user.save();

  return await logPayment(user, 'time', timeMenuId);
}

/**
 * @description 구독
 * @param user 
 * @param subscriptionMenuId 
 */
export const subscribe = async (user: User, subscriptionMenuId: number) => {
  const foundMenu = await SubscriptionMenu.findByPk(subscriptionMenuId);
  if (!foundMenu) {
    return null;
  }
  // 이전에 구독중인 메뉴를 비활성화
  await Subscribe.update({
    endDate: new Date()
  }, {
    where: {
      endDate: null
    }
  });
  // 새로 구독
  await Subscribe.create({
    userId: user.id,
    subscripionMenuId: foundMenu.id,
  });
  user.remainTime += foundMenu.monthlyUsableTime;

  return await logPayment(user, 'subscription', subscriptionMenuId);
}

/**
 * @description 결제 내역 DB에 저장
 * @param user 
 * @param menuType 
 * @param menuId 
 */
const logPayment = async (user: User, menuType: 'time' | 'subscription', menuId: number) => {
  return await PaymentHistory.create({
    userId: user.id,
    menuType,
    [menuType + 'MenuId']: menuId,
  });
}

/**
 * @description 활성화된 구독 가져오기
 * @param user 
 */
export const getActiveSubscription = async (user: User) => {
  const activeSubscribe = await Subscribe.findOne({
    where: {
      endDate: null
    }
  });

  return activeSubscribe;
}

/**
 * @description 이전 구독들 가져오기
 * @param user 
 */
export const getInactiveSubscription = async (user: User) => {
  const inactiveSubscribes = await Subscribe.findAll({
    where: {
      endDate: {
        [Op.not]: null
      }
    }
  });

  return inactiveSubscribes
}
