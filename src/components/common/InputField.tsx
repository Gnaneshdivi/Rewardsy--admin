import { Form, Input } from 'antd';
import { Rule } from 'antd/lib/form';

interface InputFieldProps {
  name: string;
  label: string;
  rules?: Rule[];
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  rules = [],
  placeholder,
  type = 'text',
}) => {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input placeholder={placeholder} type={type} />
    </Form.Item>
  );
};

export default InputField;
