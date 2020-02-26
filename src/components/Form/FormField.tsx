import "antd/lib/form/style/index.css";

import * as React from "react";
import styled from "styled-components";
import { Checkbox } from "antd";

import FormContext from "./FormContext";

export interface OwnProps {
  label?: React.ReactNode;
  labelWidth?: number;
  gutter?: number;
  suffix?: string | React.ReactNode;
  required?: boolean;
  name?: string;
  tip?: boolean;
  inline?: boolean;
  children?: React.ReactNode;
  onValueChange?: (value: any) => void;
  aside?: string;
}

export interface Props extends OwnProps {
  error?: string;
  value?: string;
  onChange?: (...args: any[]) => void;
}

export interface State {}

export class FormField extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    labelWidth: 120,
    gutter: 20,
    tip: true
  };

  public shouldComponentUpdate(nextProps: Props) {
    const { value, error, children } = this.props;
    const childProps = (children || ({} as any)).props;
    const nextChildProps = ((nextProps && nextProps.children) || ({} as any))
      .props;

    return (
      value !== nextProps.value ||
      error !== nextProps.error ||
      children !== nextProps.children ||
      childProps !== nextChildProps
    );
  }

  public render() {
    const {
      name,
      label,
      labelWidth = 120,
      gutter = 20,
      tip = true,
      inline,
      suffix,
      required,
      children,
      value,
      error,
      onChange,
      aside
    } = this.props;

    let realChildren = children;

    if (React.isValidElement(children) && name) {
      const type = children && (children as any).type;

      const props =
        type === Checkbox
          ? { ...children.props, checked: value, onChange }
          : { ...children.props, value, onChange };

      realChildren = React.cloneElement(children, props);
    }

    return (
      <Wrapper inline={inline} tip={tip} className="formField-wrapper">
        {label !== undefined && (
          <Header
            required={required}
            width={labelWidth}
            gutter={gutter}
            className="label"
          >
            {label}
          </Header>
        )}
        <Container
          className={(error ? "has-error" : "") + " formField-container"}
          data-form-name={name}
        >
          <Control>{realChildren}</Control>
          {tip && error && <Message>{error}</Message>}
          {aside && <Aside>{aside}</Aside>}
        </Container>
        {suffix !== undefined && <Footer>{suffix}</Footer>}
      </Wrapper>
    );
  }
}

export default function FormFieldWrapper(props: OwnProps) {
  const { name, labelWidth, onValueChange, ...rest } = props;

  return (
    <FormContext.Consumer>
      {context =>
        name ? (
          <FormField
            {...props}
            labelWidth={labelWidth || context.labelWidth}
            value={context.getFieldValue(name)}
            error={context.getFieldError(name)}
            onChange={(...args) => {
              let e = args[0];
              const value =
                e && e.target
                  ? e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value
                  : e;
              context.onFieldChange(name, args);
              setTimeout(() => {
                onValueChange && onValueChange(value);
              }, 0);
            }}
          />
        ) : (
          <FormField {...rest} labelWidth={labelWidth || context.labelWidth} />
        )
      }
    </FormContext.Consumer>
  );
}

const Wrapper = styled.div<{ tip?: boolean; inline?: boolean }>`
  margin-bottom: ${p => (p.tip ? "20px" : 0)};
  display: ${p => (p.inline ? "inline-flex" : "flex")};
  align-items: flex-start;
  min-height: 32px;

  & & {
    margin-bottom: 0;
  }
`;

const Header = styled.div<{
  required?: boolean;
  width: number;
  gutter: number;
}>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: ${p => p.gutter}px;
  font-size: 14px;
  text-align: right;
  width: ${p => p.width}px;
  height: 32px;

  &::before {
    display: ${p => (p.required ? "inline" : "none")};
    content: "*";
    color: red;
  }
`;

const Container = styled.div`
  position: relative;
  flex: 1;
  width: 0;

  .ant-select,
  .ant-input-number,
  .ant-cascader-picker,
  .ant-calendar-picker {
    width: 100% !important;
  }
`;

const Control = styled.span``;

const Message = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 12px;
  color: red;
`;
const Aside = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 12px;
  color: #999;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 32px;
  margin-left: 10px;
  font-size: 14px;
`;
