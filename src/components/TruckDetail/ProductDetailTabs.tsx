import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import ContactForm from '../ContactForm';
import CostEstimator from './CostEstimator';
import { Truck } from '@/models/TruckTypes';

interface ProductDetailTabsProps {
  truck: Truck;
}

interface TabDefinition {
  value: string;
  label: string;
}

const ProductDetailTabs: React.FC<ProductDetailTabsProps> = ({ truck }) => {
  const getTabs = (): TabDefinition[] => {
    return [
      { value: 'description', label: 'Mô tả chi tiết' },
      { value: 'specs', label: 'Thông số kỹ thuật' },
      { value: 'contact', label: 'Liên hệ tư vấn' }
    ];
  };

  const tabs = getTabs();

  const renderSpecTable = (specs: Record<string, any>, title?: string) => {
    if (!specs || Object.keys(specs).length === 0) return null;

    return (
      <div className="mb-6">
        {title && <h4 className="font-bold text-lg bg-gray-100 p-2 rounded mb-3">{title}</h4>}
        <table className="w-full border-collapse border">
          <tbody>
            {Object.entries(specs).map(([key, value]) => {
              if (!value || key === 'length' || key === 'width' || key === 'height') return null;
              return (
                <tr key={key} className="border-b">
                  <td className="py-2 px-3 text-gray-600 w-1/3">{key}</td>
                  <td className="py-2 px-3 font-medium">{String(value)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Tabs defaultValue="description" className="mt-12">
      <TabsList
        className={`grid w-full bg-transparent p-0 h-auto border-b border-gray-200`}
        style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
      >
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 py-3 px-4 font-medium hover:text-blue-600 transition-colors"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="description" className="p-6 bg-white border-x border-b mt-0">
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-gray-700">{truck.description}</p>
          {truck.detailedDescription && (
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: truck.detailedDescription }}
            />
          )}
        </div>
      </TabsContent>

      <TabsContent value="specs" className="p-6 bg-white border-x border-b mt-0">
        <div>
          <h4 className="font-bold text-lg bg-gray-100 p-2 rounded mb-3">Thông số kỹ thuật chung</h4>
          <table className="w-full border-collapse border mb-6">
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-3 text-gray-600 w-1/3">Thương hiệu</td>
                <td className="py-2 px-3 font-medium">{Array.isArray(truck.brand) ? truck.brand.join(', ') : truck.brand}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3 text-gray-600">Tải trọng</td>
                <td className="py-2 px-3 font-medium">{truck.weightText}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3 text-gray-600">Kích thước</td>
                <td className="py-2 px-3 font-medium">{truck.dimensions}</td>
              </tr>
              {truck.origin && (
                <tr className="border-b">
                  <td className="py-2 px-3 text-gray-600">Xuất xứ</td>
                  <td className="py-2 px-3 font-medium">{truck.origin}</td>
                </tr>
              )}
              {truck.engineModel && (
                <tr className="border-b">
                  <td className="py-2 px-3 text-gray-600">Động cơ</td>
                  <td className="py-2 px-3 font-medium">{truck.engineModel}</td>
                </tr>
              )}
              {truck.enginePower && (
                <tr className="border-b">
                  <td className="py-2 px-3 text-gray-600">Công suất</td>
                  <td className="py-2 px-3 font-medium">{truck.enginePower}</td>
                </tr>
              )}
              {truck.transmission && (
                <tr className="border-b">
                  <td className="py-2 px-3 text-gray-600">Hộp số</td>
                  <td className="py-2 px-3 font-medium">{truck.transmission}</td>
                </tr>
              )}
              {truck.wheelbaseText && (
                <tr className="border-b">
                  <td className="py-2 px-3 text-gray-600">Chiều dài cơ sở</td>
                  <td className="py-2 px-3 font-medium">{truck.wheelbaseText}</td>
                </tr>
              )}
            </tbody>
          </table>

          {truck.tractorSpec && (
            <>
              <h4 className="font-bold text-lg bg-gray-100 p-2 rounded mb-3">Thông số đầu kéo</h4>
              <table className="w-full border-collapse border mb-6">
                <tbody>
                  {truck.tractorSpec.horsepower && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600 w-1/3">Công suất</td>
                      <td className="py-2 px-3 font-medium">{truck.tractorSpec.horsepower} HP</td>
                    </tr>
                  )}
                  {truck.tractorSpec.torque && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Mô-men xoắn</td>
                      <td className="py-2 px-3 font-medium">{truck.tractorSpec.torque}</td>
                    </tr>
                  )}
                  {truck.tractorSpec.transmissionType && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Loại hộp số</td>
                      <td className="py-2 px-3 font-medium">{truck.tractorSpec.transmissionType}</td>
                    </tr>
                  )}
                  {truck.tractorSpec.maxTowingCapacityText && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Khả năng kéo tối đa</td>
                      <td className="py-2 px-3 font-medium">{truck.tractorSpec.maxTowingCapacityText}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          {truck.trailerSpec && (
            <>
              <h4 className="font-bold text-lg bg-gray-100 p-2 rounded mb-3">Thông số mooc</h4>
              <table className="w-full border-collapse border mb-6">
                <tbody>
                  {truck.trailerSpec.axleCount && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600 w-1/3">Số trục</td>
                      <td className="py-2 px-3 font-medium">{truck.trailerSpec.axleCount} trục</td>
                    </tr>
                  )}
                  {truck.trailerSpec.totalLength && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Chiều dài tổng thể</td>
                      <td className="py-2 px-3 font-medium">{truck.trailerSpec.totalLength}</td>
                    </tr>
                  )}
                  {truck.trailerSpec.loadingHeight && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Chiều cao sàn</td>
                      <td className="py-2 px-3 font-medium">{truck.trailerSpec.loadingHeight}</td>
                    </tr>
                  )}
                  {truck.trailerSpec.suspensionType && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Hệ thống treo</td>
                      <td className="py-2 px-3 font-medium">{truck.trailerSpec.suspensionType}</td>
                    </tr>
                  )}
                  {truck.trailerSpec.brakeSystem && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Hệ thống phanh</td>
                      <td className="py-2 px-3 font-medium">{truck.trailerSpec.brakeSystem}</td>
                    </tr>
                  )}
                  {truck.trailerSpec.tireSpec && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Lốp xe</td>
                      <td className="py-2 px-3 font-medium">{truck.trailerSpec.tireSpec}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          {truck.craneSpec && (
            <>
              <h4 className="font-bold text-lg bg-gray-100 p-2 rounded mb-3">Thông số cẩu</h4>
              <table className="w-full border-collapse border mb-6">
                <tbody>
                  {truck.craneSpec.liftingCapacityText && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600 w-1/3">Sức nâng</td>
                      <td className="py-2 px-3 font-medium">{truck.craneSpec.liftingCapacityText}</td>
                    </tr>
                  )}
                  {truck.craneSpec.maxLiftingMoment && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Moment nâng lớn nhất</td>
                      <td className="py-2 px-3 font-medium">{truck.craneSpec.maxLiftingMoment}</td>
                    </tr>
                  )}
                  {truck.craneSpec.maxLiftingHeight && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Chiều cao nâng lớn nhất</td>
                      <td className="py-2 px-3 font-medium">{truck.craneSpec.maxLiftingHeight}</td>
                    </tr>
                  )}
                  {truck.craneSpec.maxWorkingRadius && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Bán kính làm việc</td>
                      <td className="py-2 px-3 font-medium">{truck.craneSpec.maxWorkingRadius}</td>
                    </tr>
                  )}
                  {truck.craneSpec.boomType && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Loại cần</td>
                      <td className="py-2 px-3 font-medium">{truck.craneSpec.boomType}</td>
                    </tr>
                  )}
                  {truck.craneSpec.boomLength && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Chiều dài cần</td>
                      <td className="py-2 px-3 font-medium">{truck.craneSpec.boomLength}</td>
                    </tr>
                  )}
                  {truck.craneSpec.hydraulicPumpType && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Loại bơm thủy lực</td>
                      <td className="py-2 px-3 font-medium">{truck.craneSpec.hydraulicPumpType}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          {truck.coolingBox && (
            <>
              <h4 className="font-bold text-lg bg-gray-100 p-2 rounded mb-3">Thông số làm lạnh</h4>
              <table className="w-full border-collapse border mb-6">
                <tbody>
                  {truck.coolingBox.temperatureRange && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600 w-1/3">Phạm vi nhiệt độ</td>
                      <td className="py-2 px-3 font-medium">{truck.coolingBox.temperatureRange}</td>
                    </tr>
                  )}
                  {truck.coolingBox.coolingUnit && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Đơn vị làm lạnh</td>
                      <td className="py-2 px-3 font-medium">{truck.coolingBox.coolingUnit}</td>
                    </tr>
                  )}
                  {truck.coolingBox.insulationThickness && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Độ dày cách nhiệt</td>
                      <td className="py-2 px-3 font-medium">{truck.coolingBox.insulationThickness}</td>
                    </tr>
                  )}
                  {truck.coolingBox.wallMaterials && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Vật liệu vách</td>
                      <td className="py-2 px-3 font-medium">{truck.coolingBox.wallMaterials.join(', ')}</td>
                    </tr>
                  )}
                  {truck.coolingBox.doorType && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Loại cửa</td>
                      <td className="py-2 px-3 font-medium">{truck.coolingBox.doorType}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          {truck.insulatedBox && renderSpecTable(truck.insulatedBox, 'Thông số thùng bảo ôn')}
          {truck.closedBox && renderSpecTable(truck.closedBox, 'Thông số thùng kín')}
          {truck.tarpaulinBox && renderSpecTable(truck.tarpaulinBox, 'Thông số thùng bạt')}
          {truck.flatbedBox && renderSpecTable(truck.flatbedBox, 'Thông số thùng lửng')}

          {truck.tankSpec && (
            <>
              <h4 className="font-bold text-lg bg-gray-100 p-2 rounded mb-3">Thông số bồn xi téc</h4>
              <table className="w-full border-collapse border mb-6">
                <tbody>
                  {truck.tankSpec.capacityText && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600 w-1/3">Dung tích</td>
                      <td className="py-2 px-3 font-medium">{truck.tankSpec.capacityText}</td>
                    </tr>
                  )}
                  {truck.tankSpec.compartments && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Số ngăn</td>
                      <td className="py-2 px-3 font-medium">{truck.tankSpec.compartments}</td>
                    </tr>
                  )}
                  {truck.tankSpec.material && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Vật liệu</td>
                      <td className="py-2 px-3 font-medium">{truck.tankSpec.material}</td>
                    </tr>
                  )}
                  {truck.tankSpec.thickness && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Độ dày</td>
                      <td className="py-2 px-3 font-medium">{truck.tankSpec.thickness}</td>
                    </tr>
                  )}
                  {truck.tankSpec.safetyEquipment && (
                    <tr className="border-b">
                      <td className="py-2 px-3 text-gray-600">Thiết bị an toàn</td>
                      <td className="py-2 px-3 font-medium">{truck.tankSpec.safetyEquipment}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
      </TabsContent>

      <TabsContent value="contact" className="p-6 bg-white border-x border-b mt-0">
        <ContactForm productName={truck.name} />
      </TabsContent>
    </Tabs>
  );
};

export default ProductDetailTabs;
