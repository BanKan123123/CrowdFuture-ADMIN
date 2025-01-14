'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { createCompanyThunk, getAIGenerateIdeaThunk } from '../../app/redux/thunks/companyThunks';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useRouter } from 'next/navigation';
import { Company } from '@/company';
import { generateRecordThunk } from '@/app/redux/thunks/recordThunkgs';
import React, { useEffect, useState } from 'react';
import { Button } from './button';
import { LoaderCircle } from 'lucide-react';
import { Textarea } from './textarea';
import LoadingLogin from './loading-login';

const formSchema = z.object({
     name: z.string(),
     idea: z.string(),
     location: z.string(),
     capital: z.number(),
     currency: z.string(),
});

interface IdeaInputFormProps {
     document?: any;
}

export default function IdeaInputForm({ document }: IdeaInputFormProps) {
     const router = useRouter();
     const { loadingGenerate } = useSelector((state: RootState) => state.record);
     const initialDocumentBusiness = document ? `${document.name || ''}${document.explanation ? ` - ${document.explanation}` : ''} ${document.overview?.items?.join(', ') || ''}` : '';
     const initialCapital = document ? document.totalInvestment || document.financial?.investment || 0 : 0;
     const [isAIButtonClicked, setIsAIButtonClicked] = useState(false);
     const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: { capital: initialCapital, idea: initialDocumentBusiness },
     });
     useEffect(() => {
          const updatedCapital = document ? document.totalInvestment || document.financial?.investment || 0 : 0;

          const updatedIdea = document ? `${document.name || ''}${document.explanation ? ` - ${document.explanation}` : ''} ${document.overview?.items?.join(', ') || ''}` : '';

          form.setValue('capital', updatedCapital);
          form.setValue('idea', updatedIdea); // Cập nhật giá trị cho 'idea'
     }, [document, form]);
     const { setValue } = form;
     const dispatch = useDispatch<AppDispatch>();

     const handleGenerateIdea = async (e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          setIsAIButtonClicked(true);
          const ideaData = form.getValues().idea;
          const response = await dispatch(
               getAIGenerateIdeaThunk({
                    input: ideaData,
                    onSuccess: () => {
                         setIsAIButtonClicked(false);
                    },
               }),
          );

          if (response) {
               setValue('idea', response.payload.data); // Update the idea input field
               return response;
          }
          return null;
     };

     const onSubmit = async (values: z.infer<typeof formSchema>) => {
          try {
               const capitalValue = parseFloat(values.capital.toString());
               if (isNaN(capitalValue)) {
                    throw new Error('Invalid value for capital');
               }

               let ideaData: string = values.idea;
               if (isAIButtonClicked) {
                    const aiGeneratedIdea = await dispatch(
                         getAIGenerateIdeaThunk({
                              input: values.idea,
                              onSuccess: () => {
                                   setIsAIButtonClicked(false);
                              },
                         }),
                    );
                    if (aiGeneratedIdea) {
                         ideaData = aiGeneratedIdea.payload;
                         setValue('idea', aiGeneratedIdea.payload);
                    }
               }

               const updatedValues: Company = {
                    _id: '',
                    createdAt: new Date(),
                    reportId: '',
                    ...values,
                    idea: ideaData,
                    capital: capitalValue,
               };

               // const translateResponse = axios.post('https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=en&to=es&query=Thank%20you%20for%20choosing%20me!', {
               //      header: {
               //           'x-rapidapi-key': '1729e35b5emsh0f2011ced6aa899p14c6a9jsnd5b0ee09f0bb',
               //           'x-rapidapi-host': 'free-google-translator.p.rapidapi.com',
               //           'Content-Type': 'application/json',
               //      },
               //      data: {
               //           q: updatedValues
               //      },
               // });

               // console.log('Dịch thành công:', translateResponse);

               const result = await dispatch(createCompanyThunk(updatedValues));
               const companyId = result?.payload.metadata?._id;
               if (!companyId) throw new Error('Company ID not found.');
               await dispatch(
                    generateRecordThunk({
                         companyId: companyId,
                         onSuccess: () => {
                              toast.success('Generate record success', {
                                   action: {
                                        label: 'View Business',
                                        onClick: () => {
                                             router.push(`/business-plan/v1/${companyId}`);
                                        },
                                   },
                                   duration: Infinity,
                                   dismissible: true,
                                   className: 'my-custom-toast',
                              });
                         },
                    }),
               );
          } catch (error) {
               console.error('Error creating company:', error);
               toast.error(error instanceof Error ? error.message : 'An unknown error occurred');
          }
     };

     if (loadingGenerate) {
          return <LoadingLogin title="Đang tiến hành xử lý dữ liệu" />;
     }
     return (
          <div className="pt-10 ">
               <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto py-12 px-8 shadow-lg bg-white rounded-xl dark:bg-space-dark glass-box">
                         <h1 className="text-2xl font-semibold text-center">Nhập thông tin dự án của bạn</h1>

                         <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                   <FormItem>
                                        <FormLabel className="  font-medium">Tên dự án kinh doanh</FormLabel>
                                        <FormControl>
                                             <Input
                                                  className="outline-none dark:bg-[#1a1f3c] dark:text-space-text w-full p-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-400 dark:focus:border-blue-400 dark:border-blue-200"
                                                  placeholder="Tên dự án kinh doanh của bạn"
                                                  {...field}
                                             />
                                        </FormControl>
                                        <FormMessage />
                                   </FormItem>
                              )}
                         />

                         <FormField
                              control={form.control}
                              name="idea"
                              render={({ field }) => (
                                   <FormItem>
                                        <div className="flex justify-between items-center">
                                             <FormLabel className="  font-medium">Chi tiết dự án kinh doanh</FormLabel>
                                             <Button disabled={isAIButtonClicked} onClick={handleGenerateIdea} className="text-white font-medium dark:submit_button">
                                                  Mô tả thêm ý tưởng
                                             </Button>
                                        </div>
                                        <FormControl>
                                             <Textarea
                                                  className="w-full p-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-400 dark:focus:border-blue-400 dark:border-blue-200"
                                                  placeholder="Mô tả dự án kinh doanh của bạn"
                                                  {...field}
                                                  defaultValue={field.value || initialDocumentBusiness} // Cung cấp giá trị mặc định là chuỗi rỗng nếu field.value là undefined hoặc null
                                             />
                                        </FormControl>
                                        <FormMessage />
                                   </FormItem>
                              )}
                         />

                         <FormField
                              control={form.control}
                              name="location"
                              render={({ field }) => (
                                   <FormItem>
                                        <FormLabel className="  font-medium">Địa điểm</FormLabel>

                                        <FormControl>
                                             <Input
                                                  className="outline-none dark:bg-[#1a1f3c] dark:text-space-text w-full p-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-400 dark:focus:border-blue-400 dark:border-blue-200"
                                                  placeholder="Địa điểm dự án"
                                                  {...field}
                                             />
                                        </FormControl>
                                        <FormMessage />
                                   </FormItem>
                              )}
                         />

                         {/* Capital Field */}
                         <FormField
                              control={form.control}
                              name="capital"
                              render={({ field }) => (
                                   <FormItem>
                                        <FormLabel className="  font-medium">Vốn</FormLabel>
                                        <FormControl>
                                             <Input
                                                  type="text"
                                                  className="outline-none dark:bg-[#1a1f3c] dark:text-space-text w-full p-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-400 dark:focus:border-blue-400 dark:border-blue-200"
                                                  placeholder="Số vốn dự kiến đầu tư"
                                                  value={(field.value || 0).toLocaleString('vi-VN')}
                                                  onChange={(e) => {
                                                       const rawValue = e.target.value.replace(/\D/g, ''); // Loại bỏ ký tự không phải số
                                                       const numberValue = parseFloat(rawValue) || 0;
                                                       field.onChange(numberValue);
                                                  }}
                                             />
                                        </FormControl>
                                        <FormMessage />
                                   </FormItem>
                              )}
                         />

                         <FormField
                              control={form.control}
                              name="currency"
                              defaultValue="VND"
                              render={({ field }) => (
                                   <FormItem>
                                        <FormLabel className="  font-medium">Đơn vị tiền tệ</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                             <FormControl>
                                                  <SelectTrigger>
                                                       <SelectValue placeholder="Chọn đơn vị tiền tệ" />
                                                  </SelectTrigger>
                                             </FormControl>
                                             <SelectContent>
                                                  <SelectItem value="VND">VND</SelectItem>
                                                  <SelectItem value="USD">USD</SelectItem>
                                             </SelectContent>
                                        </Select>
                                        <FormMessage />
                                   </FormItem>
                              )}
                         />
                         <Button disabled={loadingGenerate} type="submit" className="dark:submit_button w-full bg-blue-500 hover:bg-blue-600 text-white font-medium p-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                              {loadingGenerate ? (
                                   <LoaderCircle className="animate-spin" />
                              ) : (
                                   <>
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Nhận ý tưởng kinh doanh
                                   </>
                              )}
                         </Button>
                    </form>
               </Form>
          </div>
     );
}
