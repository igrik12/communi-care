import _ from 'lodash';
import bcrypt from 'bcryptjs';
import Chartist from 'chartist';

const saltRounds = 10;
const delays = 80,
  durations = 500;

export const update = (arr, id, newval) => {
  var index = _.findIndex(arr, (item) => item.id === id);
  arr.splice(index, 1, newval);
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (hash, password) => {
  return await bcrypt.compare(hash, password);
};

export const hasPermissions = ({ permissions }, className) => {
  if (!permissions || !permissions.length) return false;
  return Array.isArray(permissions) && permissions.includes(className);
};

export const generateChartsData = (typeData) => {
  const returnValue = {
    data: {
      labels: _.keys(typeData),
      series: [_.values(typeData)],
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 20,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    animation: {
      draw: function (data) {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint,
            },
          });
        } else if (data.type === 'point') {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease',
            },
          });
        }
      },
    },
  };
  return returnValue;
};
