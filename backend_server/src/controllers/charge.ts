import { wrapper } from '@src/utils/wrapper';
import * as ChargeServices from '@src/services/charge';

export const getSubscriptionMenus = wrapper(async (req, res) => {
  const menus = await ChargeServices.getSubscriptionMenus();

  return res.status(200).json({
    menus
  });
});

export const chargeTime = wrapper(async (req, res) => {
  await ChargeServices.chargeTime(req.user!, req.body.hours);
  return res.status(200).json();
});

export const subscribe = wrapper(async (req, res) => {
  const result = await ChargeServices.subscribe(req.user!, req.body.subscriptionMenuId);
  if (!result) {
    return res.status(400).json({
      err: 'invalid subscriptionMenuId'
    });
  }
  return res.status(200).json();
});
