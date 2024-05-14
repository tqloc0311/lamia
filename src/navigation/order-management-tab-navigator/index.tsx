import { OrderManagementScreen } from '@lamia/screens';
import { Colors } from '@lamia/utils/theme/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderManagementTabBar from './tab-bar';

const Tab = createMaterialTopTabNavigator();

const OrderManagementTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <OrderManagementTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray5,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'white' },
      }}>
      <Tab.Screen
        name="OrderManagementAll"
        component={OrderManagementScreen}
        options={{ title: 'Tất cả' }}
      />
      <Tab.Screen
        name="OrderManagementSuccess"
        component={OrderManagementScreen}
        options={{ title: 'Thành công' }}
      />
      <Tab.Screen
        name="OrderManagementProcessing"
        component={OrderManagementScreen}
        options={{ title: 'Đăng xử lý' }}
      />
      <Tab.Screen
        name="OrderManagementWaiting"
        component={OrderManagementScreen}
        options={{ title: 'Chờ giao hàng' }}
      />
    </Tab.Navigator>
  );
};

export default OrderManagementTabNavigator;
