import { useState, useEffect, ChangeEvent } from 'react';

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  position: string;
  sex: string;
  age: string;
  education: EducationItem[];
  skills: string[];
  experience: ExperienceItem[];
  newSkill?: string;
  projects: ProjectItem[];
}

interface EducationItem {
  name: string;
  label: string[];
  profession: string;
  startTime: string;
  endTime: string;
  content: string[];
  newContent?: string;
  newLabel?: string;
}

interface ExperienceItem {
  company: string;
  position: string;
  startTime: string;
  endTime: string;
  content: string[];
  label: string[]; // 添加技术栈标签
  newContent?: string;
  newLabel?: string; // 添加临时标签输入
}

interface ProjectItem {
  name: string;
  role: string;
  startTime: string;
  endTime: string;
  label: string[];
  content: string[];
  newLabel?: string;
  newContent?: string;
}

const initialFormData: ResumeData = {
  name: '',
  email: '',
  phone: '',
  position: '',
  sex: '',
  age: '',
  education: [
    {
      name: '',
      label: [],
      profession: '',
      startTime: '',
      endTime: '',
      content: [],
      newContent: '',
      newLabel: '',
    },
  ],
  skills: [],
  experience: [
    {
      company: '',
      position: '',
      startTime: '',
      endTime: '',
      content: [],
      label: [], // 初始化标签数组
      newContent: '',
      newLabel: '', // 初始化临时标签
    },
  ],
  newSkill: '',
  projects: [
    {
      name: '',
      role: '',
      startTime: '',
      endTime: '',
      label: [],
      content: [],
      newLabel: '',
      newContent: '',
    },
  ],
};

// 表单字段组件
interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows?: number;
  width?: 'full' | 'half';
}

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  rows,
  width = 'full',
}: FormFieldProps) => {
  const commonClasses = `w-full px-3 py-2 border border-gray-300 rounded-md flex items-center`;

  return (
    <div className={width === 'full' ? 'w-full' : 'w-[calc(50%-0.5rem)]'}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={commonClasses}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={commonClasses}
        />
      )}
    </div>
  );
};

const sampleData: ResumeData = {
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  position: '后端开发工程师',
  sex: '男',
  age: '25',
  education: [
    {
      name: '某某大学',
      profession: '软件工程',
      startTime: '2019.09',
      endTime: '2023.06',
      label: ['本科', '计算机学院'],
      content: [
        'GPA 3.8/4.0，专业前 10%',
        '获得校级优秀毕业生称号',
        '担任算法协会会长，组织多次技术分享会',
      ],
      newLabel: '',
      newContent: '',
    },
  ],
  skills: [
    '熟练掌握 Java 核心技术，包括集合框架、并发编程、JVM 调优等',
    '熟悉 Spring、Spring Boot、Spring Cloud 等主流框架的使用和原理',
    '熟练使用 MySQL，了解数据库优化技术，能够编写高效的 SQL 语句',
    '熟悉 Redis 缓存技术，了解常见的缓存问题及解决方案',
    '熟悉 RabbitMQ、Kafka 等消息中间件的使用和原理',
    '了解分布式系统设计原理，熟悉微服务架构',
    '熟练使用 Git 进行版本控制，了解 CI/CD 流程',
    '具备良好的问题分析和解决能力，以及团队协作精神',
  ],
  experience: [
    {
      company: '某某科技有限公司',
      position: '后端实习生',
      startTime: '2022.07',
      endTime: '2023.03',
      label: ['Java', 'Spring Boot'],
      content: [
        '参与公司核心业务系统的开发和维护，负责订单模块的重构，提升了系统性能30%',
        '设计并实现了基于Redis的分布式锁方案，解决了高并发场景下的数据一致性问题',
        '优化了系统的数据库查询性能，将复杂查询响应时间从3秒降低到500ms',
      ],
      newLabel: '',
      newContent: '',
    },
  ],
  projects: [
    {
      name: '电商平台订单系统',
      role: '核心开发者',
      startTime: '2022.09',
      endTime: '2022.12',
      label: ['Spring Cloud', 'MySQL'],
      content: [
        '设计并实现了基于微服务架构的订单系统，支持10万+日订单处理',
        '使用RabbitMQ实现了订单异步处理机制，提高了系统的吞吐量',
        '实现了基于Redis的订单缓存方案，降低了数据库压力',
        '编写单元测试，测试覆盖率达到80%以上',
      ],
      newLabel: '',
      newContent: '',
    },
    {
      name: '日志监控平台',
      role: '项目负责人',
      startTime: '2022.03',
      endTime: '2022.06',
      label: ['Kafka', 'Docker'],
      content: [
        '设计并实现了分布式日志收集和分析系统，日处理日志量100GB+',
        '使用Elasticsearch实现日志的存储和检索，支持复杂的查询条件',
        '基于Kafka实现了日志的实时传输和处理',
        '使用Docker容器化部署，提高了系统的可维护性',
      ],
      newLabel: '',
      newContent: '',
    },
  ],
  newSkill: '',
};

const Resume = () => {
  const [formData, setFormData] = useState<ResumeData>(initialFormData);

  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (!Array.isArray(parsedData.education)) {
        parsedData.education = initialFormData.education;
      }
      if (!Array.isArray(parsedData.skills)) {
        parsedData.skills = initialFormData.skills;
      }
      if (!Array.isArray(parsedData.experience)) {
        parsedData.experience = initialFormData.experience;
      }
      if (!Array.isArray(parsedData.projects)) {
        parsedData.projects = initialFormData.projects;
      }
      setFormData(parsedData);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleEducationAdd = () => {
    setFormData(prev => {
      const newEducation = {
        name: '',
        label: [],
        profession: '',
        startTime: '',
        endTime: '',
        content: [],
      };
      const newData = {
        ...prev,
        education: [...prev.education, newEducation],
      };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleEducationChange = (index: number, field: keyof EducationItem, value: any) => {
    setFormData(prev => {
      const newEducation = [...prev.education];
      if (field === 'label' || field === 'content') {
        // 处理数组类型的字段，假设用逗号分隔
        newEducation[index] = {
          ...newEducation[index],
          [field]: value.split(','),
        };
      } else {
        newEducation[index] = {
          ...newEducation[index],
          [field]: value,
        };
      }
      const newData = { ...prev, education: newEducation };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleEducationRemove = (index: number) => {
    setFormData(prev => {
      const newEducation = prev.education.filter((_, i) => i !== index);
      const newData = { ...prev, education: newEducation };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddSkill = () => {
    setFormData(prev => {
      if (!prev.newSkill?.trim()) return prev; // 如果没有输入内容则不添加
      const newData = {
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: '', // 清空输入框
      };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleRemoveSkill = (index: number) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        skills: prev.skills.filter((_, i) => i !== index),
      };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleAddEducationContent = (index: number) => {
    setFormData(prev => {
      const newEducation = [...prev.education];
      const education = newEducation[index];

      if (!education.newContent?.trim()) return prev;

      education.content = [...education.content, education.newContent.trim()];
      education.newContent = ''; // 清空输入

      const newData = { ...prev, education: newEducation };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleRemoveEducationContent = (eduIndex: number, contentIndex: number) => {
    setFormData(prev => {
      const newEducation = [...prev.education];
      newEducation[eduIndex].content = newEducation[eduIndex].content.filter(
        (_, i) => i !== contentIndex
      );

      const newData = { ...prev, education: newEducation };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleAddEducationLabel = (index: number) => {
    setFormData(prev => {
      const newEducation = [...prev.education];
      const education = newEducation[index];

      if (!education.newLabel?.trim()) return prev;

      education.label = [...education.label, education.newLabel.trim()];
      education.newLabel = ''; // 清空输入

      const newData = { ...prev, education: newEducation };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleRemoveEducationLabel = (eduIndex: number, labelIndex: number) => {
    setFormData(prev => {
      const newEducation = [...prev.education];
      newEducation[eduIndex].label = newEducation[eduIndex].label.filter(
        (_, i) => i !== labelIndex
      );

      const newData = { ...prev, education: newEducation };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleExperienceAdd = () => {
    setFormData(prev => {
      const newExperience = {
        company: '',
        position: '',
        startTime: '',
        endTime: '',
        content: [],
        label: [], // 初始化标签数组
        newContent: '',
        newLabel: '', // 初始化临时标签
      };
      const newData = {
        ...prev,
        experience: [...prev.experience, newExperience],
      };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleExperienceRemove = (index: number) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        experience: prev.experience.filter((_, i) => i !== index),
      };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleAddExperienceContent = (index: number) => {
    setFormData(prev => {
      const newExperience = [...prev.experience];
      const experience = newExperience[index];

      if (!experience.newContent?.trim()) return prev;

      experience.content = [...experience.content, experience.newContent.trim()];
      experience.newContent = '';

      const newData = { ...prev, experience: newExperience };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleRemoveExperienceContent = (expIndex: number, contentIndex: number) => {
    setFormData(prev => {
      const newExperience = [...prev.experience];
      newExperience[expIndex].content = newExperience[expIndex].content.filter(
        (_, i) => i !== contentIndex
      );

      const newData = { ...prev, experience: newExperience };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleAddExperienceLabel = (index: number) => {
    setFormData(prev => {
      const newExperience = [...prev.experience];
      const experience = newExperience[index];

      if (!experience.newLabel?.trim()) return prev;

      experience.label = [...experience.label, experience.newLabel.trim()];
      experience.newLabel = '';

      const newData = { ...prev, experience: newExperience };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleRemoveExperienceLabel = (expIndex: number, labelIndex: number) => {
    setFormData(prev => {
      const newExperience = [...prev.experience];
      newExperience[expIndex].label = newExperience[expIndex].label.filter(
        (_, i) => i !== labelIndex
      );

      const newData = { ...prev, experience: newExperience };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleProjectAdd = () => {
    setFormData(prev => {
      const newProject = {
        name: '',
        role: '',
        startTime: '',
        endTime: '',
        label: [],
        content: [],
        newLabel: '',
        newContent: '',
      };
      const newData = {
        ...prev,
        projects: [...prev.projects, newProject],
      };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleProjectRemove = (index: number) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        projects: prev.projects.filter((_, i) => i !== index),
      };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleAddProjectLabel = (index: number) => {
    setFormData(prev => {
      const newProjects = [...prev.projects];
      const project = newProjects[index];

      if (!project.newLabel?.trim()) return prev;

      project.label = [...project.label, project.newLabel.trim()];
      project.newLabel = '';

      const newData = { ...prev, projects: newProjects };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleRemoveProjectLabel = (projectIndex: number, labelIndex: number) => {
    setFormData(prev => {
      const newProjects = [...prev.projects];
      newProjects[projectIndex].label = newProjects[projectIndex].label.filter(
        (_, i) => i !== labelIndex
      );

      const newData = { ...prev, projects: newProjects };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleAddProjectContent = (index: number) => {
    setFormData(prev => {
      const newProjects = [...prev.projects];
      const project = newProjects[index];

      if (!project.newContent?.trim()) return prev;

      project.content = [...project.content, project.newContent.trim()];
      project.newContent = '';

      const newData = { ...prev, projects: newProjects };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleRemoveProjectContent = (projectIndex: number, contentIndex: number) => {
    setFormData(prev => {
      const newProjects = [...prev.projects];
      newProjects[projectIndex].content = newProjects[projectIndex].content.filter(
        (_, i) => i !== contentIndex
      );

      const newData = { ...prev, projects: newProjects };
      localStorage.setItem('resumeData', JSON.stringify(newData));
      return newData;
    });
  };

  const initializeSampleData = () => {
    setFormData(sampleData);
    localStorage.setItem('resumeData', JSON.stringify(sampleData));
  };

  return (
    <>
      {/* 打印样式 */}
      <style type="text/css">
        {`
          @media print {
            /* 重置所有默认边距 */
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            /* 移除浏览器默认的页边距 */
            @page {
              margin: 0;
              size: A4;
            }

            /* 隐藏不需要打印的元素 */
            nav, 
            footer,
            header,
            .no-print,
            button {
              display: none !important;
            }

            /* 调整打印区域布局 */
            body {
              margin: 0 !important;
              padding: 0 !important;
              width: 100%;
              height: 100%;
            }

            /* 调整简历容器样式 */
            .container {
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              max-width: none !important;
            }

            /* 调整简历预览区域 */
            .print-area {
              margin: 0 !important;
              width: 100% !important;
              box-shadow: none !important;
              border-radius: 0 !important;
            }

            /* 调整最大宽度容器 */
            .max-w-[800px] {
              max-width: none !important;
              margin: 0 !important;
            }

            /* 其他样式保持不变... */
          }
        `}
      </style>

      <div className="container w-full">
        <div className="flex flex-col lg:flex-row gap-6 w-[100%]">
          {/* 左侧表单 */}
          <div className="w-full bg-gray-50 p-6 rounded-lg no-print">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">📝 编辑简历</h2>
              <p className="text-gray-600 text-sm">
                编辑完成后，点击下方按钮或使用浏览器打印功能（Ctrl + P 或 ⌘ + P）导出 PDF
              </p>
            </div>

            <form className="space-y-4">
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  onClick={initializeSampleData}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm"
                >
                  加载示例数据
                </button>
              </div>

              <div className="flex flex-wrap gap-4">
                <FormField
                  label="姓名"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  width="half"
                />
                <FormField
                  label="岗位"
                  name="position"
                  type="text"
                  value={formData.position}
                  onChange={handleChange}
                  width="half"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <FormField
                  label="电话"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  width="half"
                />
                <FormField
                  label="邮箱"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  width="half"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <FormField
                  label="性别"
                  name="sex"
                  type="text"
                  value={formData.sex}
                  onChange={handleChange}
                  width="half"
                />
                <FormField
                  label="年龄"
                  name="age"
                  type="text"
                  value={formData.age}
                  onChange={handleChange}
                  width="half"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">教育经历</h3>
                  <button
                    type="button"
                    onClick={handleEducationAdd}
                    className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    添加教育经历
                  </button>
                </div>

                {formData.education?.map((edu, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-md space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">教育经历 {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => handleEducationRemove(index)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        删除
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <FormField
                        label="学校名称"
                        name={`education.${index}.name`}
                        value={edu.name}
                        onChange={e => handleEducationChange(index, 'name', e.target.value)}
                        width="half"
                      />
                      <FormField
                        label="专业"
                        name={`education.${index}.profession`}
                        value={edu.profession}
                        onChange={e => handleEducationChange(index, 'profession', e.target.value)}
                        width="half"
                      />
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <FormField
                        label="开始时间"
                        name={`education.${index}.startTime`}
                        value={edu.startTime}
                        onChange={e => handleEducationChange(index, 'startTime', e.target.value)}
                        width="half"
                      />
                      <FormField
                        label="结束时间"
                        name={`education.${index}.endTime`}
                        value={edu.endTime}
                        onChange={e => handleEducationChange(index, 'endTime', e.target.value)}
                        width="half"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <FormField
                          label="添加标签"
                          name={`education.${index}.newLabel`}
                          value={edu.newLabel || ''}
                          onChange={e => {
                            const newEducation = [...formData.education];
                            newEducation[index].newLabel = e.target.value;
                            setFormData(prev => ({ ...prev, education: newEducation }));
                          }}
                          width="full"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddEducationLabel(index)}
                          className="mt-[24px] px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 gap-1 text-sm"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {edu.label.map((label, labelIndex) => (
                          <div
                            key={labelIndex}
                            className="group flex items-center gap-1 px-2.5 py-1 bg-blue-50 rounded-md border border-blue-100 hover:border-blue-200 transition-colors duration-200"
                          >
                            <span className="text-sm text-gray-700">{label}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveEducationLabel(index, labelIndex)}
                              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <FormField
                          label="添加详细内容"
                          name={`education.${index}.newContent`}
                          value={edu.newContent || ''}
                          onChange={e => {
                            const newEducation = [...formData.education];
                            newEducation[index].newContent = e.target.value;
                            setFormData(prev => ({ ...prev, education: newEducation }));
                          }}
                          width="full"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddEducationContent(index)}
                          className="mt-[24px] px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 gap-1 text-sm"
                        >
                          +
                        </button>
                      </div>

                      <div className="space-y-2">
                        {edu.content.map((content, contentIndex) => (
                          <div
                            key={contentIndex}
                            className="group flex justify-between items-center p-2.5 bg-gray-50 rounded-md border border-gray-100 hover:border-gray-200 transition-colors duration-200"
                          >
                            <span className="text-gray-700">{content}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveEducationContent(index, contentIndex)}
                              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>

                      {edu.content.length === 0 && (
                        <div className="text-gray-400 text-center py-4 bg-gray-50 rounded-md border border-dashed border-gray-200">
                          暂无详细内容，请点击上方按钮添加
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">专业技能</h3>
                </div>

                <div className="p-4 border border-gray-200 rounded-md space-y-4">
                  <div className="flex gap-2">
                    <FormField
                      label="添加技能"
                      name="newSkill"
                      value={formData.newSkill || ''}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          newSkill: e.target.value,
                        }))
                      }
                      width="full"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="mt-[24px] px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 gap-1 text-sm"
                    >
                      +
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {formData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="group flex justify-between items-center p-2.5 bg-blue-50 rounded-md border border-blue-100 hover:border-blue-200 transition-colors duration-200"
                      >
                        <span className="text-gray-700">{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(index)}
                          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {formData.skills.length === 0 && (
                    <div className="text-gray-400 text-center py-8 bg-gray-50 rounded-md border border-dashed border-gray-200">
                      暂无技能，请点击上方按钮添加
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">实习经历</h3>
                  <button
                    type="button"
                    onClick={handleExperienceAdd}
                    className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    添加实习经历
                  </button>
                </div>

                {formData.experience.map((exp, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-md space-y-4">
                    <div className="flex justify-between items-center mb-2.5">
                      <h4 className="font-medium">实习经历 {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => handleExperienceRemove(index)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        删除
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <FormField
                        label="公司名称"
                        name={`experience.${index}.company`}
                        value={exp.company}
                        onChange={e => {
                          const newExperience = [...formData.experience];
                          newExperience[index].company = e.target.value;
                          setFormData(prev => ({ ...prev, experience: newExperience }));
                        }}
                        width="half"
                      />
                      <FormField
                        label="职位"
                        name={`experience.${index}.position`}
                        value={exp.position}
                        onChange={e => {
                          const newExperience = [...formData.experience];
                          newExperience[index].position = e.target.value;
                          setFormData(prev => ({ ...prev, experience: newExperience }));
                        }}
                        width="half"
                      />
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <FormField
                        label="开始时间"
                        name={`experience.${index}.startTime`}
                        value={exp.startTime}
                        onChange={e => {
                          const newExperience = [...formData.experience];
                          newExperience[index].startTime = e.target.value;
                          setFormData(prev => ({ ...prev, experience: newExperience }));
                        }}
                        width="half"
                      />
                      <FormField
                        label="结束时间"
                        name={`experience.${index}.endTime`}
                        value={exp.endTime}
                        onChange={e => {
                          const newExperience = [...formData.experience];
                          newExperience[index].endTime = e.target.value;
                          setFormData(prev => ({ ...prev, experience: newExperience }));
                        }}
                        width="half"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <FormField
                          label="添加技术栈标签"
                          name={`experience.${index}.newLabel`}
                          value={exp.newLabel || ''}
                          onChange={e => {
                            const newExperience = [...formData.experience];
                            newExperience[index].newLabel = e.target.value;
                            setFormData(prev => ({ ...prev, experience: newExperience }));
                          }}
                          width="full"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddExperienceLabel(index)}
                          className="mt-[24px] px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 gap-1 text-sm"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.label.map((label, labelIndex) => (
                          <div
                            key={labelIndex}
                            className="group flex items-center gap-1 px-2.5 py-1 bg-blue-50 rounded-md border border-blue-100 hover:border-blue-200 transition-colors duration-200"
                          >
                            <span className="text-sm text-gray-700">{label}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveExperienceLabel(index, labelIndex)}
                              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <FormField
                          label="添加工作内容"
                          name={`experience.${index}.newContent`}
                          value={exp.newContent || ''}
                          onChange={e => {
                            const newExperience = [...formData.experience];
                            newExperience[index].newContent = e.target.value;
                            setFormData(prev => ({ ...prev, experience: newExperience }));
                          }}
                          width="full"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddExperienceContent(index)}
                          className="mt-[24px] px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 gap-1 text-sm"
                        >
                          +
                        </button>
                      </div>

                      <div className="space-y-2">
                        {exp.content.map((content, contentIndex) => (
                          <div
                            key={contentIndex}
                            className="group flex justify-between items-center p-2.5 bg-gray-50 rounded-md border border-gray-100 hover:border-gray-200 transition-colors duration-200"
                          >
                            <span className="text-gray-700">{content}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveExperienceContent(index, contentIndex)}
                              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>

                      {exp.content.length === 0 && (
                        <div className="text-gray-400 text-center py-4 bg-gray-50 rounded-md border border-dashed border-gray-200">
                          暂无工作内容，请点击上方按钮添加
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">项目经历</h3>
                  <button
                    type="button"
                    onClick={handleProjectAdd}
                    className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    添加项目经历
                  </button>
                </div>

                {formData.projects.map((project, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-md space-y-4">
                    <div className="flex justify-between items-center mb-2.5">
                      <h4 className="font-medium">项目经历 {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => handleProjectRemove(index)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        删除
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <FormField
                        label="项目名称"
                        name={`projects.${index}.name`}
                        value={project.name}
                        onChange={e => {
                          const newProjects = [...formData.projects];
                          newProjects[index].name = e.target.value;
                          setFormData(prev => ({ ...prev, projects: newProjects }));
                        }}
                        width="half"
                      />
                      <FormField
                        label="担任角色"
                        name={`projects.${index}.role`}
                        value={project.role}
                        onChange={e => {
                          const newProjects = [...formData.projects];
                          newProjects[index].role = e.target.value;
                          setFormData(prev => ({ ...prev, projects: newProjects }));
                        }}
                        width="half"
                      />
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <FormField
                        label="开始时间"
                        name={`projects.${index}.startTime`}
                        value={project.startTime}
                        onChange={e => {
                          const newProjects = [...formData.projects];
                          newProjects[index].startTime = e.target.value;
                          setFormData(prev => ({ ...prev, projects: newProjects }));
                        }}
                        width="half"
                      />
                      <FormField
                        label="结束时间"
                        name={`projects.${index}.endTime`}
                        value={project.endTime}
                        onChange={e => {
                          const newProjects = [...formData.projects];
                          newProjects[index].endTime = e.target.value;
                          setFormData(prev => ({ ...prev, projects: newProjects }));
                        }}
                        width="half"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <FormField
                          label="添加技术栈标签"
                          name={`projects.${index}.newLabel`}
                          value={project.newLabel || ''}
                          onChange={e => {
                            const newProjects = [...formData.projects];
                            newProjects[index].newLabel = e.target.value;
                            setFormData(prev => ({ ...prev, projects: newProjects }));
                          }}
                          width="full"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddProjectLabel(index)}
                          className="mt-[24px] px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 gap-1 text-sm"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.label.map((label, labelIndex) => (
                          <div
                            key={labelIndex}
                            className="group flex items-center gap-1 px-2.5 py-1 bg-blue-50 rounded-md border border-blue-100 hover:border-blue-200 transition-colors duration-200"
                          >
                            <span className="text-sm text-gray-700">{label}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveProjectLabel(index, labelIndex)}
                              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <FormField
                          label="添加项目内容"
                          name={`projects.${index}.newContent`}
                          value={project.newContent || ''}
                          onChange={e => {
                            const newProjects = [...formData.projects];
                            newProjects[index].newContent = e.target.value;
                            setFormData(prev => ({ ...prev, projects: newProjects }));
                          }}
                          width="full"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddProjectContent(index)}
                          className="mt-[24px] px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 gap-1 text-sm"
                        >
                          +
                        </button>
                      </div>

                      <div className="space-y-2">
                        {project.content.map((content, contentIndex) => (
                          <div
                            key={contentIndex}
                            className="group flex justify-between items-center p-2.5 bg-gray-50 rounded-md border border-gray-100 hover:border-gray-200 transition-colors duration-200"
                          >
                            <span className="text-gray-700">{content}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveProjectContent(index, contentIndex)}
                              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>

                      {project.content.length === 0 && (
                        <div className="text-gray-400 text-center py-4 bg-gray-50 rounded-md border border-dashed border-gray-200">
                          暂无项目描述，请点击上方按钮添加
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 导出按钮区域 */}
              <div className="pt-6 space-y-4">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  导出为 PDF
                </button>

                <div className="text-sm text-gray-600 bg-gray-100 p-4 rounded-md">
                  <p className="font-medium mb-2">💡 导出提示：</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>点击上方按钮直接打开打印对话框</li>
                    <li>选择"另存为 PDF"选项</li>
                    <li>建议将边距设置为"无"以获得最佳效果</li>
                    <li>
                      也可以使用键盘快捷键：
                      <span className="inline-flex gap-1 items-center ml-1">
                        <kbd className="px-2 py-0.5 text-xs bg-gray-200 rounded">Ctrl</kbd>
                        <span>+</span>
                        <kbd className="px-2 py-0.5 text-xs bg-gray-200 rounded">P</kbd>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>

          {/* 右侧预览 */}
          <div className="w-full  print-area bg-white p-6 rounded-lg shadow-md min-h-[600px]">
            <div className="max-w-full mx-auto">
              {/* 头部信息 */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h1 className="text-[28px] text-gray-800 border-l-4 border-blue-500 pl-3 m-0">
                    {formData.name}
                  </h1>
                  <div className="text-gray-600 mt-2.5 mb-1 text-sm">
                    {formData.position} | {formData.phone} | {formData.email} | {formData.sex} |{' '}
                    {formData.age}岁
                  </div>
                </div>
                <div className="flex gap-1.5 items-center">
                  <svg height="20" viewBox="0 0 24 24" width="20" className="fill-current">
                    <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z" />
                  </svg>
                  <span className="text-gray-600">FoundDream</span>
                </div>
              </div>

              {/* 教育背景 */}
              <div className="mb-3.5">
                <div className="flex gap-1.5 items-center pb-1 mb-2.5 border-b-2 border-[#096dd9]">
                  <div className="text-lg text-blue-700 font-bold">教育背景</div>
                  <div className="text-gray-400 text-sm">EDUCATION EXPERIENCE</div>
                </div>

                {formData.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-2.5 text-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="font-bold">{edu.name}</div>
                        {edu.label.map((label, labelIndex) => (
                          <div
                            key={labelIndex}
                            className="bg-blue-50 text-blue-500 w-auto h-5 text-xs text-center leading-5 px-1"
                          >
                            {label}
                          </div>
                        ))}
                        <div className="text-sm ml-2.5">{edu.profession}</div>
                      </div>
                      <div className="text-gray-600">
                        {edu.startTime} - {edu.endTime}
                      </div>
                    </div>
                    <ul className="m-0 pl-2 text-sm">
                      {edu.content.map((item, contentIndex) => (
                        <li key={contentIndex} className="flex gap-1 items-center mb-1">
                          <div className="w-[18px] h-[18px] bg-blue-300 text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {contentIndex + 1}
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* 专业技能 */}
              <div className="mb-3.5">
                <div className="flex gap-1.5 items-center pb-1 mb-2.5 border-b-2 border-[#096dd9]">
                  <div className="text-lg text-blue-700 font-bold">专业技能</div>
                  <div className="text-gray-400 text-sm">TECHNICAL SKILLS</div>
                </div>
                <ul className="m-0 pl-2 text-sm">
                  {formData.skills.map((skill, index) => (
                    <li key={index} className="flex gap-1 items-center mb-1">
                      <div className="w-[18px] h-[18px] bg-blue-300 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 实习经历 */}
              <div className="mb-3.5">
                <div className="flex gap-1.5 items-center pb-1 mb-2.5 border-b-2 border-[#096dd9]">
                  <div className="text-lg text-blue-700 font-bold">实习经历</div>
                  <div className="text-gray-400 text-sm">INTERNSHIP EXPERIENCE</div>
                </div>

                {formData.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-2.5 text-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="font-bold">{exp.company}</div>
                        {exp.label.map((label, labelIndex) => (
                          <div
                            key={labelIndex}
                            className="bg-blue-50 text-blue-500 w-auto h-5 text-xs text-center leading-5 px-1"
                          >
                            {label}
                          </div>
                        ))}
                        <div className="text-sm ml-2.5">{exp.position}</div>
                      </div>
                      <div className="text-gray-600">
                        {exp.startTime} - {exp.endTime}
                      </div>
                    </div>
                    <ul className="m-0 pl-2 text-sm">
                      {exp.content.map((item, contentIndex) => (
                        <li key={contentIndex} className="flex gap-1 items-center mb-1">
                          <div className="w-[18px] h-[18px] bg-blue-300 text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {contentIndex + 1}
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {/* 添加项目经历预览部分 */}
              <div className="mb-3.5">
                <div className="flex gap-1.5 items-center pb-1 mb-2.5 border-b-2 border-[#096dd9]">
                  <div className="text-lg text-blue-700 font-bold">项目经历</div>
                  <div className="text-gray-400 text-sm">PROJECT EXPERIENCE</div>
                </div>

                {formData.projects.map((project, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-2.5 text-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="font-bold">{project.name}</div>
                        {project.label.map((label, labelIndex) => (
                          <div
                            key={labelIndex}
                            className="bg-blue-50 text-blue-500 w-auto h-5 text-xs text-center leading-5 px-1"
                          >
                            {label}
                          </div>
                        ))}
                        <div className="text-sm ml-2.5">{project.role}</div>
                      </div>
                      <div className="text-gray-600">
                        {project.startTime} - {project.endTime}
                      </div>
                    </div>
                    <ul className="m-0 pl-2 text-sm">
                      {project.content.map((item, contentIndex) => (
                        <li key={contentIndex} className="flex gap-1 items-center mb-1">
                          <div className="w-[18px] h-[18px] bg-blue-300 text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {contentIndex + 1}
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
